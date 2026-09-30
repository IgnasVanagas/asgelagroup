import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./pages.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteOrigin, isPreviewDeployment } from "@/lib/deployment";
import { MobileContact } from "@/components/mobile-contact";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  robots: isPreviewDeployment() ? { index: false, follow: false } : undefined,
  title: {
    default: "Asgela Group — Stogai, kurie saugo istoriją",
    template: "%s — Asgela Group",
  },
  description:
    "Stogų įrengimas, renovacija ir darbai kultūros paveldo objektuose. Daugiau nei 20 metų patirtis. Nuo jūsų namų iki Trakų salos pilies.",
  openGraph: {
    locale: "lt_LT",
    type: "website",
    siteName: "Asgela Group",
    images: [
      {
        url: "/images/trakai.jpg",
        width: 1800,
        height: 1200,
        alt: "Trakų salos pilis",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#f5f3ee" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body>
        <a className="skip-link" href="#main">
          Pereiti prie turinio
        </a>
        <Header />
        {children}
        <Footer />
        <MobileContact />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${getSiteOrigin()}/#organization`,
              name: "Asgela Group",
              url: getSiteOrigin(),
              telephone: contact.phone,
              email: contact.email,
              logo: `${getSiteOrigin()}/icon.svg`,
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
