import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedProjectRow } from "@/components/FeaturedProjectRow";
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
          <div className="mt-12 flex flex-col gap-8 sm:gap-10">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectRow key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <MemoryBar />
    </>
  );
}
