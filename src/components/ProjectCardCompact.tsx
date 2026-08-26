import { Project } from "@/types";

export function ProjectCardCompact({ project }: { project: Project }) {
  return (
    <article className="card-corner flex flex-col gap-3 rounded-md border border-line bg-base-panel p-5 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-ink">{project.name}</h3>
        {project.period && (
          <span className="shrink-0 font-mono text-[11px] text-ink-muted">{project.period}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">{project.oneLiner}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 font-mono text-[12px] uppercase tracking-wide text-signal hover:text-signal-soft"
        >
          GitHub ↗
        </a>
      )}
    </article>
  );
}
