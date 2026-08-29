import Link from "next/link";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-schematic-grid bg-grid opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        />
        <div className="absolute left-[8%] top-[12%] h-[420px] w-[420px] rounded-full bg-signal/[0.08] blur-[110px]" />
        <div className="absolute right-[10%] bottom-[-10%] h-[320px] w-[320px] rounded-full bg-teal/[0.06] blur-[100px]" />

        <div className="absolute left-0 top-0 h-11 w-11 border-l border-t border-signal-dim/70" />
        <div className="absolute bottom-0 right-0 h-11 w-11 border-b border-r border-signal-dim/70" />
      </div>

      <div className="container-content relative py-16 sm:py-24 lg:py-28">
        <div className="animate-fade-up relative z-10 max-w-xl">
          <p className="eyebrow">Firmware / Embedded Systems</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-[3.2rem]">
            {site.name}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">{site.intro}</p>
          <p className="mt-2 text-sm text-ink-muted">
            {site.program}, {site.school}, {site.term}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {site.heroSkills.map((skill) => (
              <span
                key={skill}
                className="card-corner rounded-sm border border-line-strong bg-base-panel px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:border-signal-dim"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="btn-primary shadow-[0_10px_30px_-10px_rgba(227,150,62,0.55)]"
            >
              View Projects
            </Link>
            <Link href="/#contact" className="btn-secondary">
              Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
