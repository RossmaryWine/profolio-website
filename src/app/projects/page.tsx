import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCardCompact } from "@/components/ProjectCardCompact";
import { featuredProjects, otherProjects } from "@/data/projects";
import { PageBackdrop } from "@/components/PageBackdrop";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Firmware, embedded systems, and hardware/software integration projects, including a from-scratch RTOS kernel for ARM Cortex-M4.",
};

export default function ProjectsPage() {
  return (
    <PageBackdrop>
      <div className="py-16 sm:py-24">
        <div className="container-content">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Systems I&apos;ve designed and built
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Strongest firmware and hardware/software integration work first. Every project below
            links back to what problem it solved and what I actually built.
          </p>
        </div>

        <div className="container-content mt-14">
          <SectionHeader eyebrow="Featured" title="Featured projects" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <div className="container-content mt-20">
          <SectionHeader eyebrow="More" title="Other projects" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {otherProjects.map((project) => (
              <ProjectCardCompact key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}
