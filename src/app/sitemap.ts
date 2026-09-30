import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { getSiteOrigin } from "@/lib/deployment";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...["projektai", "paslaugos", "apie-mus", "kontaktai"].map((path) => ({
      url: `${base}/${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "projektai" ? 0.9 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/projektai/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/privatumas`, priority: 0.2 },
  ];
}
