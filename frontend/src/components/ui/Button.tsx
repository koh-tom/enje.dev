import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center gap-2 border-2 border-ink px-4 py-1.5 font-bold no-underline transition-[background-color,color,transform] duration-150 hover:bg-mark hover:text-paper active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants = {
  solid: "bg-mark text-paper hover:bg-paper hover:text-ink",
  outline: "bg-paper text-ink",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

/** 手書きの枠線ボタン。角丸・影・グラデーションなし */
export function Button({
  className,
  variant = "outline",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({
  className,
  variant = "outline",
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
