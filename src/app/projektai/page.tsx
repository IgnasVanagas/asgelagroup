import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryCta } from "@/components/inquiry-cta";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Projektai",
  "Asgela Group patirtis: Trakų salos pilis ir Lietuvos nacionalinis muziejus. Susipažinkite su objektais ir aptarkime jūsų projektą.",
  "/projektai",
);

export default function ProjectsPage() {
  return (
    <main id="main">
      <div className="container">
        <Breadcrumbs items={[{ label: "Projektai", href: "/projektai" }]} />
        <section className="page-intro">
          <h1>
            Vietos, kurios
            <br />
            <span className="accent-text">įpareigoja.</span>
          </h1>
          <div>
            <p>
              Nuo pastato, kurį vadinate namais, iki vietų, kurias pažįsta visa
              Lietuva. Kiekvienas projektas prasideda nuo atsakomybės.
            </p>
            <span className="page-intro-note">
              Atrinkti objektai · {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </section>
      </div>
      <div className="container portfolio-list">
        {projects.map((project, i) => (
          <article key={project.slug} className="portfolio-entry">
            <Link
              className="portfolio-image"
              href={`/projektai/${project.slug}`}
              aria-label={`Peržiūrėti projektą: ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 760px) 100vw, 90vw"
                priority={i === 0}
                className="architectural-photo"
              />
              <span className="portfolio-image-index">0{i + 1}</span>
              <span className="project-open">
                <ArrowUpRight size={30} strokeWidth={1.25} />
              </span>
            </Link>
            <div className="portfolio-entry-info">
              <div>
                <h2>
                  <Link href={`/projektai/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>
                <p>
                  {project.location} <span>·</span> {project.category}
                </p>
              </div>
              <div>
                <p>{project.intro}</p>
                <Link className="text-link" href={`/projektai/${project.slug}`}>
                  Susipažinti su objektu <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="container portfolio-bridge">
        <h2>
          Tas pats požiūris.
          <br />
          <span className="muted-heading">Ir jūsų namams.</span>
        </h2>
        <div>
          <p>
            Paveldo objektai išmoko vertinti detalę. Tą patį dėmesį skiriame
            naujo stogo įrengimui, renovacijai ir remontui.
          </p>
          <Link href="/paslaugos" className="text-link">
            Atraskite mūsų paslaugas <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <InquiryCta source="/projektai" />
    </main>
  );
}
