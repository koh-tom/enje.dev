import { cn } from "@/lib/utils";
import type { TocEntry } from "@/types/content";

type TocProps = { entries: TocEntry[] };

/** 目次。h2 と h3 だけ。見出しが 2 つ未満なら出さない */
export function Toc({ entries }: TocProps) {
  if (entries.length < 2) return null;
  return (
    <nav aria-label="目次" className="frame p-4 text-sm">
      <p className="mb-2 font-display text-xl">目次</p>
      <ol className="flex flex-col gap-1">
        {entries.map((entry) => (
          <li key={entry.id} className={cn(entry.level === 3 && "pl-4")}>
            <a
              href={`#${entry.id}`}
              className="no-underline hover:underline-wavy"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
