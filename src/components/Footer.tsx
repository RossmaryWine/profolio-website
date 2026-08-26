import Link from "next/link";
import { site } from "@/data/site";
import { MemoryBar } from "@/components/MemoryBar";

export function Footer() {
  return (
    <footer className="border-t border-line bg-base-raised">
      <MemoryBar />
      <div className="container-content flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold text-ink">{site.name}</p>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">
            {site.program} · {site.school}
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-[13px]">
          <a href={`mailto:${site.email}`} className="text-ink-soft hover:text-signal">
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-signal"
          >
            github.com/{site.github.split("/").pop()}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-signal"
          >
            linkedin.com/in/{site.linkedin.split("/in/")[1]?.replace(/\/$/, "")}
          </a>
        </div>
      </div>
      <div className="container-content flex flex-col gap-2 border-t border-line-soft py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js &amp; Tailwind CSS.</p>
        <Link href="/contact" className="hover:text-signal">
          Get in touch →
        </Link>
      </div>
    </footer>
  );
}
