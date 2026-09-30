import { projects, services } from "./content";

export const inquirySources = [
  "/",
  "/projektai",
  "/paslaugos",
  "/apie-mus",
  "/kontaktai",
  ...projects.map((p) => `/projektai/${p.slug}`),
];
export const inquiryServices = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
  { slug: "kvalifikacijos-dokumentai", title: "Kvalifikacijos dokumentai" },
  { slug: "kitas-klausimas", title: "Kitas klausimas" },
];

export function inquiryHref({
  service,
  project,
  source,
}: { service?: string; project?: string; source?: string } = {}) {
  const query = new URLSearchParams();
  if (service && inquiryServices.some((s) => s.slug === service))
    query.set("paslauga", service);
  if (project && projects.some((p) => p.slug === project))
    query.set("projektas", project);
  if (source && inquirySources.includes(source)) query.set("is", source);
  return `/kontaktai${query.size ? `?${query.toString()}` : ""}#uzklausa`;
}
