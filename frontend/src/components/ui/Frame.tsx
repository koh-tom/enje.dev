import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type FrameProps<T extends ElementType = "div"> = {
  as?: T;
  tilt?: boolean;
} & ComponentProps<T>;

/**
 * 手書きの枠。tilt を付けると紙に貼ったメモのように少し傾く
 */
export function Frame<T extends ElementType = "div">({
  as,
  tilt = false,
  className,
  ...props
}: FrameProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "frame p-5",
        tilt &&
          "-rotate-[0.4deg] transition-transform duration-200 hover:rotate-0",
        className,
      )}
      {...props}
    />
  );
}
