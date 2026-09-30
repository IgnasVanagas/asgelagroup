import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Nuotraukų autoriai",
  "Svetainėje naudojamų fotografijų autoriai, šaltiniai ir licencijos.",
  "/nuotraukos",
);
export default function Credits() {
  return (
    <main id="main" className="container legal-page">
      <Link className="back-link" href="/">
        <ArrowLeft size={16} />
        Grįžti į pradžią
      </Link>
      <h1>Vietos ir jų autoriai.</h1>
      <p>
        Svetainėje naudojamos objektų fotografijos. Jos iliustruoja pastatus ir
        nėra atliktų darbų eigos dokumentacija.
      </p>
      {projects.map((project) => (
        <section key={project.slug}>
          <h2>{project.title}</h2>
          <p>
            Fotografas: Augustas Didžgalvis (BigHead).
            <br />
            <a href={project.source} target="_blank" rel="noreferrer">
              Originali fotografija „Wikimedia Commons“
            </a>
            .<br />
            Licencija:{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              Creative Commons Attribution-ShareAlike 4.0
            </a>
            .
          </p>
          <p>
            Fotografijos pritaikytos svetainės formatui: kadravimas, dydžio
            keitimas ir sumažintas spalvų sodrumas. Šios fotografijų adaptacijos
            pateikiamos pagal tą pačią CC BY-SA 4.0 licenciją.
          </p>
        </section>
      ))}
    </main>
  );
}
