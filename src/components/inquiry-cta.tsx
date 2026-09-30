import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { inquiryHref } from "@/lib/inquiry";
import { contact } from "@/lib/content";

export function InquiryCta({
  title = "Dabar – apie jūsų projektą.",
  text = "Papasakokite, ką planuojate. Aptarsime objekto poreikius ir kitą žingsnį.",
  source,
  service,
  project,
}: {
  title?: string;
  text?: string;
  source: string;
  service?: string;
  project?: string;
}) {
  return (
    <section className="inquiry-banner">
      <div className="container inquiry-banner-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="inquiry-actions">
          <Link
            className="button button-dark"
            href={inquiryHref({ source, service, project })}
          >
            Aptarkime projektą <ArrowUpRight size={19} />
          </Link>
          <a className="inquiry-call" href={contact.phoneHref}>
            Arba skambinkite {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
