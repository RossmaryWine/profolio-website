import type { Metadata } from "next";
import { SkillGroup } from "@/components/SkillGroup";
import { skillGroups, additionalLibraries } from "@/data/skills";
import { PageBackdrop } from "@/components/PageBackdrop";

export const metadata: Metadata = {
  title: "Skills",
  description: "Languages, embedded/firmware tools, hardware, and systems programming skills.",
};

export default function SkillsPage() {
  return (
    <PageBackdrop>
      <div className="py-16 sm:py-24">
        <div className="container-content">
          <p className="eyebrow">Skills</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Languages &amp; technologies
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Organized by how I actually use them, grouped around firmware and systems work first.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <SkillGroup key={group.category} group={group} />
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-10">
            <SkillGroup group={additionalLibraries} />
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}
