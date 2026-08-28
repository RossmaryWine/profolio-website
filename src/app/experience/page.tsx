import type { Metadata } from "next";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experience } from "@/data/experience";
import { PageBackdrop } from "@/components/PageBackdrop";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience across firmware, scientific computing, and data engineering roles.",
};

export default function ExperiencePage() {
  return (
    <PageBackdrop>
      <div className="py-16 sm:py-24">
        <div className="container-content">
          <p className="eyebrow">Experience</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">Work experience</h1>

          <div className="mt-12 flex flex-col gap-6">
            {experience.map((exp) => (
              <ExperienceCard key={exp.company} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}
