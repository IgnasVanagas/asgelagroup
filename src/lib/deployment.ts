type Environment = Record<string, string | undefined>;

function httpOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

function vercelOrigin(host: string | undefined) {
  return host ? httpOrigin(`https://${host}`) : undefined;
}

export function isPreviewDeployment(env: Environment = process.env): boolean {
  return env.VERCEL_ENV === "preview";
}

export function getSiteOrigin(env: Environment = process.env): string {
  const deployment = vercelOrigin(env.VERCEL_URL);
  if (isPreviewDeployment(env) && deployment) return deployment;

  if (env.NEXT_PUBLIC_SITE_URL?.trim()) {
    const configured = httpOrigin(env.NEXT_PUBLIC_SITE_URL.trim());
    if (!configured)
      throw new Error(
        "NEXT_PUBLIC_SITE_URL must be a complete http:// or https:// URL without credentials.",
      );
    return configured;
  }

  return (
    vercelOrigin(env.VERCEL_PROJECT_PRODUCTION_URL) ||
    deployment ||
    "https://asgelagroup.lt"
  );
}

export function isAllowedContactOrigin(
  origin: string | null,
  requestUrl: string,
  env: Environment = process.env,
): boolean {
  if (origin === null) return true;
  const normalized = httpOrigin(origin);
  if (!normalized) return false;

  // Only exact, configured origins are accepted; never trust arbitrary *.vercel.app hosts.
  const allowed = [
    httpOrigin(requestUrl),
    httpOrigin(env.NEXT_PUBLIC_SITE_URL?.trim()),
    vercelOrigin(env.VERCEL_URL),
    vercelOrigin(env.VERCEL_BRANCH_URL),
    vercelOrigin(env.VERCEL_PROJECT_PRODUCTION_URL),
  ];
  return allowed.includes(normalized);
}
