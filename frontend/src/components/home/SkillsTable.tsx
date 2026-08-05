import { skills } from "@/content/profile";

const groups = ["言語", "Web", "環境"] as const;

/** 習熟度を ● と ○ で表す表。Marquee の代わり */
export function SkillsTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {groups.map((group) => (
        <table key={group} className="w-full border-collapse text-sm">
          <caption className="mb-2 text-left font-display text-2xl">
            {group}
          </caption>
          <tbody>
            {skills
              .filter((skill) => skill.group === group)
              .map((skill) => (
                <tr key={skill.name} className="border-b border-rule">
                  <th scope="row" className="py-1.5 text-left font-normal">
                    {skill.name}
                  </th>
                  <td
                    className="py-1.5 text-right tracking-[0.2em]"
                    aria-label={`5 段階中 ${skill.proficiency}`}
                  >
                    {"●".repeat(skill.proficiency)}
                    {"○".repeat(5 - skill.proficiency)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
