import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";

export function FeaturedProjectRow({ project }: { project: Project }) {
  const href = project.detail ? `/projects/${project.slug}` : "/projects";
  const description = `${project.oneLiner} ${project.problem}`;

  return (
    <Link
      href={href}
      className="card-corner group flex w-full items-center gap-6 rounded-md border border-transparent p-3 transition-colors hover:border-line hover:bg-base-panel sm:gap-8"
    >
      <div className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden rounded-md border border-line bg-base-raised bg-schematic-grid bg-grid sm:w-56 lg:w-72">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 288px, 40vw"
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
        <div className="relative mt-1.5 h-24 overflow-hidden">
          <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
            <h3 className="flex h-24 items-center text-xl font-semibold text-ink sm:text-2xl">
              {project.name}
            </h3>
            <p className="flex h-24 items-center text-[14.5px] leading-snug text-ink-soft line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
