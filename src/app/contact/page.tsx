import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch: email, GitHub, and LinkedIn.",
};

const links = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "GitHub",
    value: site.github.replace("https://", ""),
    href: site.github,
  },
  {
    label: "LinkedIn",
    value: site.linkedin.replace("https://", "").replace(/\/$/, ""),
    href: site.linkedin,
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container-content max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Get in touch</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          The fastest way to reach me is email. I&apos;m open to firmware, embedded systems, and
          low-level software roles.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-line-soft rounded-md border border-line bg-base-panel">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.label !== "Email" ? "_blank" : undefined}
              rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-base-overlay"
            >
              <span className="font-mono text-[12px] uppercase tracking-wide text-ink-muted">
                {l.label}
              </span>
              <span className="text-[15px] text-ink group-hover:text-signal">{l.value} →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
