import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCardCompact } from "@/components/ProjectCardCompact";
import { featuredProjects, otherProjects } from "@/data/projects";
import { PageBackdrop } from "@/components/PageBackdrop";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Firmware, embedded systems, and hardware/software integration projects, including an RTOS kernel built from scratch for ARM Cortex-M4.",
};

export default function ProjectsPage() {
  return (
    <PageBackdrop>
      <div className="py-16 sm:py-24">
        <div className="container-content">
          <SectionHeader eyebrow="Project" title="Featured projects" />
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
