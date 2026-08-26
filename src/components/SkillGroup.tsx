import { SkillGroupData } from "@/types";

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <div className="rounded-md border border-line bg-base-panel p-6">
      <h3 className="font-mono text-[12px] uppercase tracking-wide text-signal">
        {group.category}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-sm border border-line-strong px-2.5 py-1 text-[13px] text-ink-soft"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
