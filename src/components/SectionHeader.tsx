import Link from "next/link";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 font-mono text-[13px] uppercase tracking-wide text-signal hover:text-signal-soft"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
