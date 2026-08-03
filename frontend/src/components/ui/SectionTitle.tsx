import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  sub?: string;
  className?: string;
  as?: "h1" | "h2";
};

/** 手書きの見出し。英字は Caveat、下に太い罫線 */
export function SectionTitle({
  children,
  sub,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <div className={cn("mb-8 border-b-2 border-ink pb-2", className)}>
      <Tag className={cn(Tag === "h1" ? "text-h1" : "text-h2")}>{children}</Tag>
      {sub && <p className="font-display text-xl text-ink-soft">{sub}</p>}
    </div>
  );
}
