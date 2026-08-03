"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // ページ遷移で閉じる
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname の変化をトリガーにする
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-3xl leading-none no-underline hover:underline-wavy"
        >
          enje.dev
        </Link>

        <nav aria-label="メイン" className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display text-xl no-underline hover:underline-wavy",
                  active && "underline decoration-2 underline-offset-4",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            className="inline-flex size-9 items-center justify-center border-2 border-ink hover:bg-mark hover:text-paper"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="メイン（モバイル）"
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li
                key={link.href}
                className="border-b border-rule last:border-b-0"
              >
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between py-3 no-underline",
                    active && "font-bold",
                  )}
                >
                  <span className="font-display text-2xl">{link.label}</span>
                  <span className="text-sm text-ink-soft">{link.ja}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
