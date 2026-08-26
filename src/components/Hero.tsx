import Link from "next/link";
import { site } from "@/data/site";
import { HeroMark } from "@/components/HeroMark";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-schematic-grid bg-grid opacity-60" />
      <div className="container-content relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div className="animate-fade-up">
          <p className="eyebrow">Firmware / Embedded Systems</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.2rem]">
            {site.name}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            {site.intro}
          </p>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            {site.program}, {site.school}, {site.term}
          </p>

          <p className="mt-5 max-w-xl font-mono text-[12.5px] tracking-wide text-ink-muted">
            {site.skillsLine}
          </p>

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
          <HeroMark className="h-auto w-full max-w-[360px] text-ink-faint" />
        </div>
      </div>
    </section>
  );
}
