import { cn } from "@/lib/utils";

type RuleProps = { label?: string; className?: string };

/** 罫線。ラベル付きなら手書きの見出しのように中央に文字を置く */
export function Rule({ label, className }: RuleProps) {
  if (!label)
    return <hr className={cn("border-0 border-t border-rule", className)} />;
  return (
    <div
      className={cn("flex items-center gap-4", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-rule" />
      <span className="font-display text-xl text-ink-soft">{label}</span>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}
