import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { HeroGallery } from "@/components/hero-gallery";
import { Services } from "@/components/services";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contact, projects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { pageMetadata } from "@/lib/seo";
import { inquiryHref } from "@/lib/inquiry";

export const metadata = pageMetadata(
  "Stogai, kurie saugo istoriją",
  "Asgela Group – stogų įrengimas, renovacija ir paveldo objektų darbai. Atrinkti projektai, atestuota komanda ir aiškus kelias nuo konsultacijos iki darbų.",
  "/",
);

export default function Home() {
  return (
    <main id="main">
      <Reveal />
      <section className="hero-intro container">
        <h1>
          Įrengiame stogus,{" "}
          <br />
          <span>
            kurie kalba{" "}
            <br />
            patys už save.
          </span>
        </h1>
        <div className="hero-copy">
          <p>
            Stogų įrengimas, renovacija ir remontas – nuo privačių namų iki
            kultūros paveldo objektų.
          </p>
          <Link
            className="button button-dark hero-inquiry"
            href={inquiryHref({ source: "/" })}
          >
            Aptarkime jūsų stogą <ArrowUpRight size={18} />
          </Link>
          <a href="#projektai" className="text-link">
            Susipažinkite su mūsų darbais{" "}
            <span className="small-circle">
              <ArrowDown size={18} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </section>
      <HeroGallery />
      <section className="proof-strip container" aria-label="Mūsų patirtis">
        <div>
          <span className="proof-value">
            20<span>+</span>
          </span>
          <span>
            metų patirties
            <br />
            stogų meistrystėje
          </span>
        </div>
        <div>
          <span className="proof-icon">
            <Check strokeWidth={1.2} size={28} />
          </span>
          <span>
            Atestuota komanda
            <br />
            <span className="muted">kultūros paveldo objektams</span>
          </span>
        </div>
        <div>
          <span className="proof-icon">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="m4 19 12-12 12 12M8 16v12h16V16M13 28v-8h6v8"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </span>
          <span>
            Vienodas dėmesys
            <br />
            <span className="muted">kiekvienam stogui</span>
          </span>
        </div>
      </section>

      <section
        id="apie-mus"
        className="about-section container section-space"
        data-reveal
      >
        <div className="section-marker" aria-hidden="true">
          <span className="small-dot" />
          <span>01 — 05</span>
        </div>
        <div className="about-content">
          <h2>
            Geras stogas saugo pastatą.
            <br />
            <span className="muted-heading">Geras darbas – jo vertę.</span>
          </h2>
          <div className="about-body">
            <p>
              Esame „Asgela Group“ – stogų specialistų komanda, kuriai kokybė
              prasideda nuo požiūrio. Daugiau nei 20 metų dirbame tam, kad
              kiekvienas stogas būtų patikimas, ilgaamžis ir derėtų prie
              pastato.
            </p>
            <p>
              Mūsų patirtis apima privačius namus, komercinius pastatus ir
              Lietuvos kultūros paveldo objektus. Skiriasi jų mastas. Mūsų
              atsakomybė – ne.
            </p>
          </div>
          <Link href="/apie-mus" className="text-link about-more">
            Komanda ir mūsų požiūris <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section id="projektai" className="projects-section section-space">
        <div className="container">
          <div className="section-heading" data-reveal>
            <h2>
              Darbai, kurie
              <br />
              kalba už mus.
            </h2>
            <p>
              Vietos, kuriose palikome savo meistrystę.
              <br />
              Ir išsaugojome tai, kas svarbiausia.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          <div className="projects-note">
            <span className="small-dot" />
            <p>
              Istoriniams pastatams reikalingą tikslumą atsinešame ir į jūsų
              namus.
            </p>
          </div>
          <div className="section-more">
            <Link href="/projektai" className="text-link">
              Visi projektai <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="paslaugos"
        className="services-section container section-space"
      >
        <div className="services-intro" data-reveal>
          <h2>
            Nuo pirmo
            <br />
            brėžinio iki
            <br />
            <span className="muted-heading">paskutinės detalės.</span>
          </h2>
          <p>
            Vienas patikimas partneris visiems stogo darbams. Aiškūs sprendimai,
            apgalvota eiga ir dėmesys rezultatui.
          </p>
          <Link className="text-link" href="/paslaugos">
            Paslaugos ir darbų eiga <ArrowUpRight size={19} />
          </Link>
          <div className="roof-drawing" aria-hidden="true">
            <svg viewBox="0 0 300 160" fill="none">
              <path
                d="M20 130 148 24l130 106M42 130 148 42l108 88M65 130l83-70 85 70M88 130l60-50 62 50M111 130l37-32 39 32M20 143h258M148 24v119"
                stroke="currentColor"
                strokeWidth=".7"
              />
              <path
                d="m214 76 0-43h21v60M10 151h278M148 14v141"
                stroke="currentColor"
                strokeWidth=".7"
                strokeDasharray="3 5"
              />
            </svg>
          </div>
        </div>
        <div data-reveal>
          <Services />
        </div>
      </section>

      <section className="qualification-section" id="kvalifikacija">
        <div className="container qualification-inner">
          <div className="qualification-copy" data-reveal>
            <h2>
              Istoriją saugoti –<br />
              <span>atsakomybė.</span>
            </h2>
            <p>
              Dirbti su kultūros paveldu neužtenka vien patirties. Tam reikia
              kvalifikacijos, atestatų ir supratimo, kodėl kiekviena detalė yra
              svarbi.
            </p>
            <p>
              Mūsų komanda turi kvalifikaciją darbams kultūros paveldo
              objektuose. Projekto poreikius ir reikalingus dokumentus aptariame
              dar prieš pradėdami darbus.
            </p>
            <Link
              href="/apie-mus#kvalifikacija"
              className="text-link light-link"
            >
              Susipažinti su kvalifikacija <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="qualification-visual" data-reveal>
            <div className="certification-symbol" aria-hidden="true">
              <svg viewBox="0 0 230 230" fill="none">
                <circle
                  cx="115"
                  cy="115"
                  r="109"
                  stroke="currentColor"
                  strokeWidth=".6"
                />
                <circle
                  cx="115"
                  cy="115"
                  r="94"
                  stroke="currentColor"
                  strokeWidth=".6"
                  strokeDasharray="1 7"
                />
                <path
                  d="m62 150 53-85 53 85M85 150l30-49 30 49M103 150l36-59h36"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M115 25v13M115 192v13M25 115h13M192 115h13"
                  stroke="currentColor"
                />
              </svg>
            </div>
            <div className="qualification-list">
              <div>
                <Check size={17} />
                <span>Atestuoti specialistai</span>
              </div>
              <div>
                <Check size={17} />
                <span>Patirtis paveldo objektuose</span>
              </div>
              <div>
                <Check size={17} />
                <span>Atsakomybė už darbų kokybę</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontaktai" className="contact-section" data-contact-zone>
        <div className="container contact-inner">
          <div className="contact-copy" data-reveal>
            <h2>
              Kiekvienas stogas
              <br />
              prasideda nuo
              <br />
              <span className="accent-text">pokalbio.</span>
            </h2>
            <p>
              Papasakokite, ką planuojate.
              <br />
              Kartu rasime tinkamą sprendimą.
            </p>
            <div className="contact-links">
              <a className="contact-phone" href={contact.phoneHref}>
                {contact.phone}
                <ArrowUpRight size={21} />
              </a>
              <a href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={17} />
              </a>
            </div>
            <span className="contact-location">
              <span className="small-dot" />
              {contact.location} · Dirbame visoje Lietuvoje
            </span>
          </div>
          <div className="form-wrap" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
