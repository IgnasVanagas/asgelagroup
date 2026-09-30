import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { InquiryCta } from "@/components/inquiry-cta";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { inquiryHref } from "@/lib/inquiry";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return { title: "Projektas nerastas", robots: { index: false } };
  return pageMetadata(
    project.title,
    project.description,
    `/projektai/${project.slug}`,
    project.image,
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <main id="main">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Projektai", href: "/projektai" },
            { label: project.title, href: `/projektai/${project.slug}` },
          ]}
        />
      </div>
      <section className="project-detail-intro container">
        <Link href="/projektai" className="back-link">
          <ArrowLeft size={16} />
          Visi projektai
        </Link>
        <div className="project-detail-title">
          <h1>{project.title}</h1>
          <div className="project-detail-summary">
            <p>{project.intro}</p>
            <Link
              href={inquiryHref({
                source: `/projektai/${project.slug}`,
                project: project.slug,
                service: "paveldo-objektu-darbai",
              })}
              className="text-link"
            >
              Planuojate panašius darbus? <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="project-detail-meta">
          <span>{project.location}</span>
          <span>{project.category}</span>
          <span>Asgela Group</span>
        </div>
      </section>
      <div className="project-detail-image">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="100vw"
          priority
          className="architectural-photo"
        />
      </div>
      <div className="container image-credit">
        Objekto fotografija:{" "}
        <a href={project.source} target="_blank" rel="noreferrer">
          Augustas Didžgalvis
        </a>{" "}
        ·{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY-SA 4.0
        </a>
        . Pritaikytas kadravimas ir spalvų sodrumas.
      </div>
      <section className="project-story container">
        <h2>
          Pagarba pastatui.
          <br />
          <span className="muted-heading">Dėmesys detalei.</span>
        </h2>
        <div>
          <p>{project.description}</p>
          <p>{project.principle}</p>
          <Link href="/apie-mus#kvalifikacija" className="text-link">
            Komanda ir kvalifikacija <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="project-facts-section container">
        <h2>Objektas iš arčiau.</h2>
        <dl className="project-facts">
          <div>
            <dt>Objektas</dt>
            <dd>{project.title}</dd>
          </div>
          <div>
            <dt>Vieta</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt>Sritis</dt>
            <dd>{project.category}</dd>
          </div>
        </dl>
      </section>
      <section className="project-approach container">
        <div
          className={`project-detail-crop ${index === 0 ? "crop-castle" : "crop-museum"}`}
        >
          <Image
            src={project.image}
            alt={
              index === 0
                ? "Trakų salos pilies bokštų ir čerpinių stogų detalė – objekto fotografijos fragmentas"
                : "Nacionalinio muziejaus čerpių stogas ir fasadas – objekto fotografijos fragmentas"
            }
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className="architectural-photo"
          />
        </div>
        <div>
          <h2>
            {index === 0 ? (
              <>
                Istorinė forma.
                <br />
                Ilgalaikė atsakomybė.
              </>
            ) : (
              <>
                Vienas kompleksas.
                <br />
                Daugybė svarbių detalių.
              </>
            )}
          </h2>
          <p>
            {index === 0
              ? "Pilies bokštai ir čerpiniai stogai kuria atpažįstamą visumą. Istoriniame objekte stogo sprendimai vertinami kartu su pastato architektūra ir autentiškomis detalėmis."
              : "Muziejaus pastatuose svarbus ne tik atskiras stogas. Dangos, sujungimai ir vandens nuvedimas turi būti vertinami kaip visumos dalis, atsižvelgiant į objekto pobūdį."}
          </p>
          <p>
            Planuojant jūsų paveldo projektą, pirmiausia aptartume darbų apimtį,
            turimą projektinę informaciją ir reikiamą kvalifikaciją.
          </p>
          <Link href="/paslaugos#paveldo-objektu-darbai" className="text-link">
            Kaip dirbame paveldo objektuose <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <InquiryCta
        source={`/projektai/${project.slug}`}
        project={project.slug}
        service="paveldo-objektu-darbai"
        title="Jūsų pastatas turi savo istoriją."
        text="Papasakokite apie planuojamus darbus. Aptarsime objektą, jo ypatumus ir jums aktualią kvalifikaciją."
      />
      <Link href={`/projektai/${next.slug}`} className="next-project container">
        <div>
          <span>Kitas projektas</span>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight strokeWidth={1} />
      </Link>
    </main>
  );
}
