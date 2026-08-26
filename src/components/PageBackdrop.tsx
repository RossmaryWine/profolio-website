import { AmbientNodes } from "@/components/AmbientNodes";

// Wraps page content with a faint, centered node-mesh background. Used on
// every page (and page region) that doesn't have its own hero graphic.
export function PageBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] sm:h-[560px] sm:w-[560px] lg:h-[680px] lg:w-[680px]">
        <AmbientNodes className="h-full w-full" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
