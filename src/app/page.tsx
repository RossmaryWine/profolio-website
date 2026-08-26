import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedProjectRow } from "@/components/FeaturedProjectRow";
import { MemoryBar } from "@/components/MemoryBar";
import { ContactSection } from "@/components/ContactSection";
import { PageBackdrop } from "@/components/PageBackdrop";
import { featuredProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PageBackdrop>
        <section className="py-16 sm:py-24">
          <div className="container-content">
            <SectionHeader
              eyebrow="Featured Work"
              title="Firmware & systems projects"
              description="From-scratch RTOS kernel work, FPGA interrupt systems, and hardware interface design: the strongest of what I've built."
              action={{ label: "View all projects", href: "/projects" }}
            />
            <div className="mt-12 flex flex-col divide-y divide-line-soft border-y border-line">
              {featuredProjects.map((project) => (
                <FeaturedProjectRow key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <MemoryBar />

        <ContactSection />
      </PageBackdrop>
    </>
  );
}
