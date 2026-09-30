"use client";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/content";
import Link from "next/link";
import { inquiryHref } from "@/lib/inquiry";

export function Services() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="service-list">
      {services.map((service, i) => (
        <article
          key={service.title}
          className={`service-row ${active === i ? "expanded" : ""}`}
        >
          <h3>
            <button
              type="button"
              aria-expanded={active === i}
              aria-controls={`service-${i}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="service-number">0{i + 1}</span>
              <span>{service.title}</span>
              {active === i ? (
                <Minus strokeWidth={1.2} />
              ) : (
                <Plus strokeWidth={1.2} />
              )}
            </button>
          </h3>
          <div
            className="service-content"
            id={`service-${i}`}
            hidden={active !== i}
          >
            <p>{service.text}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link
              className="text-link"
              href={inquiryHref({ service: service.slug, source: "/" })}
            >
              Aptarkime jūsų poreikius <ArrowUpRight size={17} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
