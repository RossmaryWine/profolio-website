import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-base-raised py-16 sm:py-24">
      <div className="container-content max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Let&apos;s build something.</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          I&apos;m open to firmware, embedded systems, and low-level software roles. Reach out any
          of the ways below.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-line-soft rounded-md border border-line bg-base-panel">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-base-overlay"
          >
            <span className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
              Email
            </span>
            <span className="text-[15px] text-ink">{site.email} →</span>
          </a>
          <a
            href={site.phoneHref}
            className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-base-overlay"
          >
            <span className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
              Phone
            </span>
            <span className="text-[15px] text-ink">{site.phone} →</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
