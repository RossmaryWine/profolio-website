import Link from "next/link";
import { site } from "@/data/site";
import { HeroGraphic } from "@/components/HeroGraphic";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-schematic-grid bg-grid opacity-60" />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] lg:block"
        style={{
          maskImage: "radial-gradient(140% 130% at 100% 0%, black 40%, rgba(0,0,0,0.6) 62%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(140% 130% at 100% 0%, black 40%, rgba(0,0,0,0.6) 62%, transparent 92%)",
        }}
      >
        <HeroGraphic className="h-full w-full pointer-events-auto cursor-crosshair" />
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
            <Link href="/#contact" className="btn-secondary">
              Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
