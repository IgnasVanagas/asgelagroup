"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/content";

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const current = projects[active];
  return (
    <section
      className="hero-gallery"
      aria-label="Atrinkti projektai"
      aria-roledescription="karuselė"
    >
      <div className="hero-photos">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={`hero-slide ${i === active ? "active" : ""}`}
            aria-hidden={i !== active}
          >
            <Image
              src={p.image}
              alt={p.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="architectural-photo"
            />
          </div>
        ))}
      </div>
      <div className="hero-image-bottom">
        <Link
          className="featured-link"
          href={`/projektai/${current.slug}`}
          aria-live="polite"
        >
          <span className="featured-number">0{active + 1}</span>
          <span>
            <span className="featured-title">{current.title}</span>
            <span className="featured-category">
              {current.category} · {current.location}
            </span>
          </span>
          <span className="circle-arrow">
            <ArrowUpRight size={23} strokeWidth={1.4} />
          </span>
        </Link>
        <div className="gallery-controls">
          <button
            type="button"
            onClick={() =>
              setActive((active + projects.length - 1) % projects.length)
            }
            aria-label="Ankstesnis projektas"
          >
            <ArrowLeft size={19} />
          </button>
          <span>
            <span>0{active + 1}</span> / 0{projects.length}
          </span>
          <button
            type="button"
            onClick={() => setActive((active + 1) % projects.length)}
            aria-label="Kitas projektas"
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
