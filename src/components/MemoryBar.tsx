import { cn } from "@/lib/utils";

// Signature divider: a stylized memory-map / free-list strip.
// Segment widths and used/free pattern are fixed but arbitrary — a visual
// motif referencing the free-list allocator in the RTOS project, not a
// literal data visualization.
const segments = [
  { w: 14, used: true },
  { w: 6, used: false },
  { w: 22, used: true },
  { w: 9, used: false },
  { w: 12, used: true },
  { w: 5, used: false },
  { w: 18, used: true },
  { w: 14, used: false },
];

export function MemoryBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      <div className="container-content">
        <div className="flex h-[7px] w-full overflow-hidden rounded-sm border border-line-strong">
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{ width: `${seg.w}%` }}
              className={cn(
                "h-full border-r border-base last:border-r-0",
                seg.used ? "bg-signal-dim" : "bg-base-overlay"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
