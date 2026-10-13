import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { formatDate, toDateTimeAttr } from "@/lib/format";
import type { QiitaItem } from "@/types/qiita";

type QiitaCardProps = { item: QiitaItem; headingLevel?: "h2" | "h3" };

/** Qiita の記事 1 件。PostCard と同じ枠で、リンクは Qiita を新しいタブで開く */
export function QiitaCard({
  item,
  headingLevel: Heading = "h3",
}: QiitaCardProps) {
  return (
    <article className="frame flex flex-col gap-2 p-5 hover:-rotate-[0.3deg]">
      <div className="flex flex-wrap items-baseline gap-x-3 text-sm text-ink-soft">
        <time dateTime={toDateTimeAttr(item.created_at)}>
          {formatDate(item.created_at)}
        </time>
        <span>Qiita</span>
      </div>
      <Heading className="text-h3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline-wavy"
        >
          {item.title}
          <Icon name="external" size={16} className="ml-1 inline" />
          <span className="sr-only">（Qiita、新しいタブで開きます）</span>
        </a>
      </Heading>
      {item.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li key={tag.name}>
              <Tag>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
