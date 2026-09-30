import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryCta } from "@/components/inquiry-cta";
import { Process } from "@/components/process";
import { inquiryHref } from "@/lib/inquiry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Apie mus ir kvalifikacija",
  "Daugiau nei 20 metų stogų meistrystės. Asgela Group komanda, požiūris į darbą ir kvalifikacija kultūros paveldo objektams.",
  "/apie-mus",
  "/images/museum.jpg",
);

export default function AboutPage() {
  return (
    <main id="main">
      <div className="container">
        <Breadcrumbs items={[{ label: "Apie mus", href: "/apie-mus" }]} />
        <section className="page-intro">
          <h1>
            Patirtis rankose.
            <br />
            <span className="accent-text">Atsakomybė požiūryje.</span>
          </h1>
          <div>
            <p>
              Esame „Asgela Group“. Stogų specialistų komanda, kuriai svarbu ir
              tai, ką matote, ir tai, kas lieka po danga.
            </p>
            <a href="#kvalifikacija" className="text-link">
              Mūsų kvalifikacija <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </div>
      <div className="about-feature-image">
        <Image
          src="/images/museum.jpg"
          alt="Lietuvos nacionalinio muziejaus stogai ir Vilniaus pilių kompleksas"
          fill
          priority
          sizes="100vw"
          className="architectural-photo"
        />
        <div>
          <span>Lietuvos nacionalinis muziejus</span>
          <Link href="/projektai/lietuvos-nacionalinis-muziejus">
            Susipažinti su objektu <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <section className="container about-story section-space">
        <div className="experience-figure">
          <span>
            20<sup>+</sup>
          </span>
          <p>
            metų patirties
            <br />
            stogų darbuose
          </p>
        </div>
        <div>
          <h2>
            Meistrystė auga.
            <br />
            <span className="muted-heading">Atsakomybė išlieka.</span>
          </h2>
          <p>
            Mūsų patirtis apima individualių namų, komercinių bei pramoninių
            pastatų stogus ir darbus kultūros paveldo objektuose. Kiekvienas
            pastatas turi savo charakterį, o kiekvienas užsakovas – savus
            lūkesčius.
          </p>
          <p>
            Prieš siūlydami sprendimą, įsigiliname į objektą. Aptariame dangą,
            darbų apimtį ir eigą. Tikslus darbas prasideda nuo aiškaus
            susitarimo.
          </p>
          <Link href="/projektai" className="text-link">
            Vietos, kuriose dirbome <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section id="kvalifikacija" className="credentials-section">
        <div className="container credentials-inner">
          <div>
            <h2>
              Pasitikėjimas,
              <br />
              <span>pagrįstas kvalifikacija.</span>
            </h2>
            <p>
              Darbas istoriniame objekte reikalauja specialių žinių ir atsakingo
              požiūrio į pastato vertę. Mūsų komanda turi kvalifikaciją darbams
              kultūros paveldo objektuose.
            </p>
            <Link
              className="button button-paper"
              href={inquiryHref({
                source: "/apie-mus",
                service: "kvalifikacijos-dokumentai",
              })}
            >
              Pasiteirauti dėl atestatų <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="credentials-explainer">
            <h3>Kvalifikacija jūsų projektui.</h3>
            <p>
              Nurodykite planuojamą darbų pobūdį ir objekto reikalavimus.
              Aptarsime aktualius kvalifikacijos dokumentus ir jų taikymo sritį.
            </p>
            <ul>
              {[
                "Kokie darbai numatyti objekte?",
                "Kokie kvalifikacijos reikalavimai keliami?",
                "Kokius dokumentus reikia pateikti?",
              ].map((item) => (
                <li key={item}>
                  <Check size={17} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/paslaugos#paveldo-objektu-darbai"
              className="text-link"
            >
              Apie darbus paveldo objektuose <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section-space">
        <div className="section-heading">
          <h2>
            Žmogiškas pokalbis.
            <br />
            Profesionalus darbas.
          </h2>
          <p>
            Vertiname aiškumą – ir pirmame pokalbyje,
            <br />
            ir kiekviename darbo etape.
          </p>
        </div>
        <Process />
      </section>
      <InquiryCta source="/apie-mus" />
    </main>
  );
}
