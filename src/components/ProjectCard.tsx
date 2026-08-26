import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const hasDetail = Boolean(project.detail);

  return (
    <article className="card-corner group flex flex-col overflow-hidden rounded-md border border-line bg-base-panel transition-colors hover:border-line-strong">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line bg-schematic-grid bg-grid bg-base-raised">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-contain p-4"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        ) : (
          <span className="font-mono text-[12px] uppercase tracking-widest text-ink-faint">
            {/* TODO: Add a project image or architecture diagram */}
            No image provided
          </span>
        )}
        {project.period && (
          <span className="absolute right-3 top-3 rounded-sm border border-line-strong bg-base/80 px-2 py-0.5 font-mono text-[11px] text-ink-soft backdrop-blur">
            {project.period}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-ink sm:text-xl">{project.name}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{project.oneLiner}</p>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              Problem
            </dt>
            <dd className="mt-1 leading-snug text-ink-soft">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              Key accomplishment
            </dt>
            <dd className="mt-1 leading-snug text-ink-soft">{project.accomplishments[0]}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-2">
          {hasDetail && (
            <Link
              href={`/projects/${project.slug}`}
              className="font-mono text-[13px] uppercase tracking-wide text-signal hover:text-signal-soft"
            >
              View project →
            </Link>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] uppercase tracking-wide text-ink-soft hover:text-ink"
            >
              GitHub ↗
            </a>
          ) : (
            !hasDetail && (
              <span className="font-mono text-[13px] uppercase tracking-wide text-ink-faint">
                Repo link coming soon
              </span>
            )
          )}
        </div>
      </div>
    </article>
  );
}
