import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { MemoryBar } from "@/components/MemoryBar";
import { featuredProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-16 sm:py-24">
        <div className="container-content">
          <SectionHeader
            eyebrow="Featured Work"
            title="Firmware & systems projects"
            description="From-scratch RTOS kernel work, FPGA interrupt systems, and hardware interface design: the strongest of what I've built."
            action={{ label: "View all projects", href: "/projects" }}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <MemoryBar />
    </>
  );
}
