import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

/** ラベル + 入力欄 + エラー。入力欄は下線だけ */
export function Field({ label, name, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-sm font-bold underline-wavy"
        >
          ! {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full border-0 border-b-2 border-ink bg-transparent px-1 py-1.5 outline-none placeholder:text-ink-soft focus-visible:border-b-[3px] focus-visible:outline-none aria-invalid:border-b-[3px]";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        inputBase,
        "min-h-40 resize-y border-2 px-3 py-2",
        className,
      )}
      {...props}
    />
  );
}
