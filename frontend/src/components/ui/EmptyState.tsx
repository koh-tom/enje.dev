type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

/** 空状態。ダミーで埋めず、手書きの一言だけ置く */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="frame flex flex-col items-center gap-3 border-dashed px-6 py-12 text-center">
      <p className="font-display text-3xl">{title}</p>
      {description && <p className="text-ink-soft">{description}</p>}
      {action}
    </div>
  );
}
