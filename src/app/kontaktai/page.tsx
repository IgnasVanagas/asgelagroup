import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactFromQuery } from "@/components/contact-from-query";
import { ContactForm } from "@/components/contact-form";
import { Process } from "@/components/process";
import { contact } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Kontaktai ir projekto užklausa",
  "Papasakokite apie savo stogo projektą. Susisiekite su Asgela Group telefonu +370 645 93982 arba pateikite užklausą. Vilnius ir projektai visoje Lietuvoje.",
  "/kontaktai",
);

export default function ContactPage() {
  return (
    <main id="main">
      <div className="container">
        <Breadcrumbs items={[{ label: "Kontaktai", href: "/kontaktai" }]} />
      </div>
      <section className="contact-page-section container" data-contact-zone>
        <div className="contact-page-copy">
          <h1>
            Pradėkime
            <br />
            <span className="accent-text">nuo pokalbio.</span>
          </h1>
          <p>
            Planuojate naują stogą, atnaujinimą ar darbus istoriniame objekte?
            Papasakokite apie jį. Aptarsime, kuo galime padėti.
          </p>
          <div className="contact-links">
            <a className="contact-phone" href={contact.phoneHref}>
              {contact.phone}
              <ArrowUpRight size={22} />
            </a>
            <a href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="contact-page-location">
            <span className="small-dot" />
            <p>
              Esame Vilniuje.
              <br />
              Projektus visoje Lietuvoje aptariame individualiai.
            </p>
          </div>
          <div className="contact-reassurance">
            <h2>Dar neturite visų detalių?</h2>
            <p>
              Galite kreiptis ir be tikslaus ploto ar pasirinktos dangos.
              Pirmame pokalbyje išsiaiškinsime, kokios informacijos reikia.
            </p>
          </div>
        </div>
        <div className="contact-page-form" id="uzklausa">
          <h2>Papasakokite apie projektą.</h2>
          <p>
            Užtenka vardo, el. pašto ir trumpo aprašymo.
            <br />
            Gavę užklausą, aptarsime poreikius ir kitą žingsnį.
          </p>
          <Suspense fallback={<ContactForm source="/kontaktai" />}>
            <ContactFromQuery />
          </Suspense>
        </div>
      </section>
      <section className="container contact-next-steps">
        <div className="section-heading">
          <h2>Kas vyksta toliau?</h2>
          <Link href="/paslaugos" className="text-link">
            Susipažinti su paslaugomis <ArrowUpRight size={18} />
          </Link>
        </div>
        <Process />
      </section>
    </main>
  );
}
