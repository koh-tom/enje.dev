import { interestGroups } from "@/content/profile";

export function Interests() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {interestGroups.map((group) => (
        <div key={group.title} className="frame p-4">
          <p className="mb-2 font-display text-2xl">{group.title}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {group.items.map((item) => (
              <div key={item.label} className="contents">
                <dt className="font-bold">{item.label}</dt>
                <dd className="text-ink-soft">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
