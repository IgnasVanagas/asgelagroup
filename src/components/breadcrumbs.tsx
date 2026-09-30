import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSiteOrigin } from "@/lib/deployment";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const links = [{ label: "Pradžia", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: links.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${getSiteOrigin()}${item.href}`,
    })),
  };
  return (
    <>
      <nav className="breadcrumbs" aria-label="Puslapio kelias">
        <ol>
          {links.map((item, i) => (
            <li key={item.href}>
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {i === links.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
