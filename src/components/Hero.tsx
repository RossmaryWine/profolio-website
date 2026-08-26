import Link from "next/link";
import { site } from "@/data/site";
import { HeroGraphic } from "@/components/HeroGraphic";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-schematic-grid bg-grid opacity-60" />
      <div className="container-content relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div className="animate-fade-up">
          <p className="eyebrow">Firmware / Embedded Systems</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-[3.2rem]">
            {site.name}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            {site.intro}
          </p>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            {site.program}, {site.school}, {site.term}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {site.heroSkills.map((skill) => (
              <span
                key={skill}
                className="card-corner rounded-sm border border-line-strong bg-base-panel px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide text-ink-soft"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <a href={site.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Résumé
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="animate-fade-up hidden justify-center [animation-delay:120ms] lg:flex">
          <HeroGraphic className="h-auto w-full max-w-[380px] cursor-crosshair" />
        </div>
      </div>
    </section>
  );
}
