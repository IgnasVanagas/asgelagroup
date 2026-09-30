import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryCta } from "@/components/inquiry-cta";
import { Process } from "@/components/process";
import { services, faqs } from "@/lib/content";
import { inquiryHref } from "@/lib/inquiry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Stogų įrengimas, renovacija ir paveldo darbai",
  "Stogų įrengimas, remontas, paveldo objektų darbai, šiltinimas ir lietaus sistemos. Aiški darbų eiga ir individualus objekto įvertinimas.",
  "/paslaugos",
);

export default function ServicesPage() {
  return (
    <main id="main">
      <div className="container">
        <Breadcrumbs items={[{ label: "Paslaugos", href: "/paslaugos" }]} />
        <section className="page-intro">
          <h1>
            Visas stogas.
            <br />
            <span className="accent-text">Viena komanda.</span>
          </h1>
          <div>
            <p>
              Naujas pastatas, atnaujinimo laukiantis namas ar istorinis
              objektas. Pradėkime nuo to, ko reikia jūsų stogui.
            </p>
            <Link
              href={inquiryHref({ source: "/paslaugos" })}
              className="text-link"
            >
              Padėkite išsirinkti sprendimą <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <nav className="service-jump-nav" aria-label="Paslaugų sąrašas">
          {services.map((service, i) => (
            <a key={service.slug} href={`#${service.slug}`}>
              <span>0{i + 1}</span>
              {service.title}
              <ArrowDown size={15} />
            </a>
          ))}
        </nav>
      </div>
      <div className="container service-details">
        {services.map((service, i) => (
          <section
            className="service-detail"
            id={service.slug}
            key={service.slug}
          >
            <div className="service-detail-heading">
              <span className="detail-number" aria-hidden="true">
                0{i + 1}
              </span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
            </div>
            <div className="service-detail-body">
              <p className="service-audience">{service.audience}</p>
              <p>{service.text}</p>
              <ul className="scope-list">
                {service.scope.map((item) => (
                  <li key={item}>
                    <Check size={17} strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="preparation-note">
                <h3>Ką verta turėti pokalbiui?</h3>
                <p>{service.preparation}</p>
              </div>
              <div className="service-detail-actions">
                <Link
                  href={inquiryHref({
                    service: service.slug,
                    source: "/paslaugos",
                  })}
                  className="button button-dark"
                >
                  Aptarkime šiuos darbus <ArrowUpRight size={18} />
                </Link>
                {service.slug === "paveldo-objektu-darbai" && (
                  <Link href="/projektai" className="text-link">
                    Patirtis paveldo objektuose <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="process-section container section-space">
        <div className="section-heading">
          <h2>
            Aiškus kitas žingsnis.
            <br />
            Visame procese.
          </h2>
          <p>
            Nuo pirminio pokalbio iki sutartų darbų.
            <br />
            Pirmiausia išsiaiškiname, kas svarbu jums.
          </p>
        </div>
        <Process />
      </section>
      <section className="faq-section">
        <div className="container faq-inner">
          <div>
            <h2>Prieš pradedant.</h2>
            <p>
              Atsakymai į klausimus, kurie dažniausiai kyla planuojant stogo
              darbus.
            </p>
            <Link href="/kontaktai" className="text-link">
              Turite kitą klausimą? <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={18} strokeWidth={1.5} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <InquiryCta
        source="/paslaugos"
        title="Geras sprendimas prasideda nuo pokalbio."
        text="Nereikia turėti visų atsakymų. Užtenka papasakoti apie savo pastatą ir planus."
      />
    </main>
  );
}
