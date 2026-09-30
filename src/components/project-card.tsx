import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";

export function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link
      className={`project-card project-card-${index + 1}`}
      href={`/projektai/${project.slug}`}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={
            index === 0
              ? "(max-width: 760px) 100vw, 58vw"
              : "(max-width: 760px) 100vw, 38vw"
          }
          className="architectural-photo"
        />
        <span className="project-tag">{project.category}</span>
        <span className="project-open">
          <ArrowUpRight size={29} strokeWidth={1.25} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.title}</h3>
          <span>{project.location}</span>
        </div>
        <span className="project-index">0{index + 1}</span>
      </div>
    </Link>
  );
}
