import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center border border-ink px-2 py-0.5 text-sm leading-tight no-underline";

type TagProps = ComponentProps<"span"> & { active?: boolean };

export function Tag({ className, active = false, ...props }: TagProps) {
  return (
    <span
      className={cn(base, active && "bg-mark text-paper", className)}
      {...props}
    />
  );
}

type TagLinkProps = ComponentProps<typeof Link> & { active?: boolean };

/** クリックできるタグ。選択中は塗りつぶす */
export function TagLink({ className, active = false, ...props }: TagLinkProps) {
  return (
    <Link
      aria-current={active ? "true" : undefined}
      className={cn(
        base,
        "hover:bg-mark hover:text-paper",
        active && "bg-mark text-paper",
        className,
      )}
      {...props}
    />
  );
}
