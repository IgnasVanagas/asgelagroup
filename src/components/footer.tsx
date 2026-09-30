import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link href="/" aria-label="Asgela Group – pradžia">
          <Brand large />
        </Link>
        <p>Meistrystė, kuri išlieka.</p>
        <a href={contact.phoneHref}>
          {contact.phone}
          <ArrowUpRight size={18} />
        </a>
      </div>
      <nav
        className="container footer-navigation"
        aria-label="Nuorodos puslapio apačioje"
      >
        <Link href="/">Pradžia</Link>
        <Link href="/projektai">Projektai</Link>
        <Link href="/paslaugos">Paslaugos</Link>
        <Link href="/apie-mus">Apie mus</Link>
        <Link href="/apie-mus#kvalifikacija">Kvalifikacija</Link>
        <Link href="/kontaktai">Kontaktai</Link>
      </nav>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Asgela Group</span>
        <span>Vilnius · Dirbame visoje Lietuvoje</span>
        <div>
          <Link href="/privatumas">Privatumas</Link>
          <Link href="/nuotraukos">Nuotraukų autoriai</Link>
        </div>
      </div>
    </footer>
  );
}
