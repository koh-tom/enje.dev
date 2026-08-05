import { timeline } from "@/content/profile";

/** 罫線 1 本に沿って並べる年表 */
export function Timeline() {
  return (
    <ol className="relative border-l-2 border-ink pl-6">
      {timeline.map((event) => (
        <li
          key={`${event.year}-${event.title}`}
          className="relative pb-8 last:pb-0"
        >
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[31px] size-3 border-2 border-ink bg-paper"
          />
          <p className="font-display text-xl text-ink-soft">{event.year}</p>
          <h3 className="text-h3">{event.title}</h3>
          <p className="text-ink-soft">{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
