"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** 紙とインクを反転させる。マウント前は同じ大きさの枠だけ出してレイアウトのズレを防ぐ */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "ライトモードにする" : "ダークモードにする";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center border-2 border-ink hover:bg-mark hover:text-paper"
    >
      {mounted ? (
        <Icon name={isDark ? "sun" : "moon"} />
      ) : (
        <span className="size-5" />
      )}
    </button>
  );
}
