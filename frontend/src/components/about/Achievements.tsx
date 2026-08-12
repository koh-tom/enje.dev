import { Tag } from "@/components/ui/Tag";
import { achievementLabels, achievements } from "@/content/profile";

/** 実績を古い順に並べた表 */
export function Achievements() {
  const sorted = [...achievements].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length === 0) return null;
  return (
    <ol className="flex flex-col">
      {sorted.map((item) => (
        <li
          key={`${item.date}-${item.title}`}
          className="grid gap-x-4 gap-y-1 border-b border-rule py-3 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline"
        >
          <span className="font-display text-xl text-ink-soft">
            {item.date}
          </span>
          <div>
            <p className="font-bold">{item.title}</p>
            {item.description && (
              <p className="text-sm text-ink-soft">{item.description}</p>
            )}
          </div>
          <Tag className="justify-self-start">
            {achievementLabels[item.category]}
          </Tag>
        </li>
      ))}
    </ol>
  );
}
