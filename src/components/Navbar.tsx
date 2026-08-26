"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-[15px] font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="ml-2 hidden font-mono text-[11px] font-normal text-ink-muted sm:inline">
            /firmware
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = !item.external && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "rounded px-3 py-2 font-mono text-[13px] uppercase tracking-wide transition-colors",
                  active
                    ? "text-signal"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded border border-line-strong text-ink md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {open ? (
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-base md:hidden">
          <div className="container-content flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="border-b border-line-soft py-3 font-mono text-[13px] uppercase tracking-wide text-ink-soft last:border-0 hover:text-signal"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
