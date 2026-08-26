import { Experience } from "@/types";

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article className="card-corner grid gap-6 rounded-md border border-line bg-base-panel p-6 sm:grid-cols-[200px_1fr] sm:p-8">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
          {exp.dateRange}
        </p>
        <p className="mt-1 text-sm text-ink-faint">{exp.location}</p>
        {exp.emphasize && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-signal-dim px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Firmware role
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-ink">{exp.title}</h3>
        <p className="mt-0.5 text-[15px] text-ink-soft">{exp.company}</p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {exp.accomplishments.map((item, i) => (
            <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-dim" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
