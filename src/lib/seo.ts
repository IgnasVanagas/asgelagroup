import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/trakai.jpg",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Asgela Group`,
      description,
      url: path,
      locale: "lt_LT",
      type: "website",
      siteName: "Asgela Group",
      images: [{ url: image, width: 1800, height: 1200 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Asgela Group`,
      description,
      images: [image],
    },
  };
}
