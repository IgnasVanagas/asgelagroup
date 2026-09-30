import { test, expect } from "@playwright/test";
import {
  getSiteOrigin,
  isPreviewDeployment,
  isAllowedContactOrigin,
} from "../src/lib/deployment";

const preview = {
  VERCEL_ENV: "preview",
  VERCEL_URL: "asgela-abc123.vercel.app",
  VERCEL_BRANCH_URL: "asgela-git-redesign.vercel.app",
  VERCEL_PROJECT_PRODUCTION_URL: "asgela.vercel.app",
  NEXT_PUBLIC_SITE_URL: "https://asgelagroup.lt/",
};

test("preview metadata uses its deployment URL and disables indexing", () => {
  expect(getSiteOrigin(preview)).toBe("https://asgela-abc123.vercel.app");
  expect(isPreviewDeployment(preview)).toBe(true);
  expect(isPreviewDeployment({ VERCEL_ENV: "production" })).toBe(false);
});

test("production metadata works before and after attaching the custom domain", () => {
  expect(getSiteOrigin({ ...preview, VERCEL_ENV: "production" })).toBe(
    "https://asgelagroup.lt",
  );
  expect(
    getSiteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "asgela.vercel.app" }),
  ).toBe("https://asgela.vercel.app");
  expect(getSiteOrigin({ VERCEL_URL: "asgela-abc123.vercel.app" })).toBe(
    "https://asgela-abc123.vercel.app",
  );
  expect(getSiteOrigin({})).toBe("https://asgelagroup.lt");
  expect(() =>
    getSiteOrigin({ NEXT_PUBLIC_SITE_URL: "asgelagroup.lt" }),
  ).toThrow("NEXT_PUBLIC_SITE_URL");
});

test("contact form accepts exact Vercel aliases behind the internal server", () => {
  for (const origin of [
    "https://asgela-abc123.vercel.app",
    "https://asgela-git-redesign.vercel.app",
    "https://asgela.vercel.app",
    "https://asgelagroup.lt",
  ]) {
    expect(
      isAllowedContactOrigin(
        origin,
        "http://localhost:3000/api/contact",
        preview,
      ),
    ).toBe(true);
  }
  expect(
    isAllowedContactOrigin(
      "http://localhost:3100",
      "http://localhost:3100/api/contact",
      {},
    ),
  ).toBe(true);
});

test("contact form rejects unrelated Vercel projects and lookalike origins", () => {
  for (const origin of [
    "https://someone-else.vercel.app",
    "https://asgelagroup.lt.evil.example",
    "https://asgelagroup.lt@evil.example",
    "null",
    "",
    "file:///etc/passwd",
  ]) {
    expect(
      isAllowedContactOrigin(
        origin,
        "http://localhost:3000/api/contact",
        preview,
      ),
    ).toBe(false);
  }
});

test("built metadata, sitemap and robots share the configured origin", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const site = getSiteOrigin();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    `${site}/images/trakai.jpg`,
  );
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  if (isPreviewDeployment()) {
    expect(await robots.text()).toContain("Disallow: /");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  } else {
    expect(await robots.text()).toContain(`Sitemap: ${site}/sitemap.xml`);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(
    `<loc>${site}/projektai/traku-salos-pilis</loc>`,
  );
});
