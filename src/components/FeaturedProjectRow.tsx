import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

export function FeaturedProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const href = project.detail ? `/projects/${project.slug}` : "/projects";

  return (
    <div className={cn("flex", flipped ? "lg:justify-end" : "lg:justify-start")}>
      <Link
        href={href}
        className={cn(
          "card-corner group flex w-full max-w-2xl items-center gap-6 rounded-md border border-transparent p-3 transition-colors hover:border-line hover:bg-base-panel sm:gap-8",
          flipped && "lg:flex-row-reverse lg:text-right"
        )}
      >
        <div className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden rounded-md border border-line bg-base-raised bg-schematic-grid bg-grid sm:w-52 lg:w-64">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 256px, 40vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              No image provided
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {project.period && (
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {project.period}
            </p>
          )}
          <div className="relative mt-1.5 h-20 overflow-hidden">
            <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
              <h3 className="flex h-20 items-center text-xl font-semibold text-ink sm:text-2xl">
                {project.name}
              </h3>
              <p className="flex h-20 items-center text-[14.5px] leading-snug text-ink-soft line-clamp-3">
                {project.oneLiner}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
