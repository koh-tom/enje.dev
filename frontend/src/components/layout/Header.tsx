"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { Magnetic } from "@/components/ui/magnetic";

/*
 * ナビゲーションリンクの定義
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/*
 * ヘッダーコンポーネント
 *
 * サイトのグローバルナビゲーション。
 * デスクトップとモバイルでレイアウトが変わります。
 */
export const Header = ({ title }: { title?: string }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  // メニューが開いている時はスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          {/* ロゴまたはサイト名 - ターミナル風 */}
          <div className="z-10">
            <Magnetic>
              <Link
                href="/"
                className="group flex items-center gap-1 text-lg md:text-xl font-mono tracking-wider text-white hover:text-gray-300 transition-colors"
              >
                <span className="text-cyan-400">~</span>
                <span className="text-gray-400">/</span>
                <span className="font-bold">enje.dev</span>
                <span className="animate-blink text-cyan-400 ml-0.5">▌</span>
              </Link>
            </Magnetic>
          </div>

          {/* ページタイトル (title prop がある場合のみ中央に表示) - デスクトップのみ */}
          {title && (
            <h1 className="hidden md:block absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-wider text-white text-center max-w-xs truncate z-0">
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </h1>
          )}

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center gap-8 z-10">
            <nav>
              <ul className="flex items-center gap-6 text-sm font-medium text-gray-300">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href} pathname={pathname}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* テーマ切り替え */}
            <Magnetic>
              <div className="inline-block">
                <ModeToggle />
              </div>
            </Magnetic>
          </div>

          {/* モバイル: テーマ切り替え + ハンバーガーボタン */}
          <div className="flex md:hidden items-center gap-4 z-10">
            <ModeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-8 h-8 flex items-center justify-center"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                />
                <span
                  className={`absolute left-0 top-2 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニューオーバーレイ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* 背景オーバーレイ */}
            <button
              type="button"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer border-none"
              onClick={handleOverlayClick}
              onKeyDown={handleOverlayKeyDown}
              aria-label="メニューを閉じる"
            />

            {/* メニューコンテンツ */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-16 bottom-0 w-72 bg-gray-950 border-l border-gray-800 p-6"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MobileNavLink href={link.href} pathname={pathname}>
                      {link.label}
                    </MobileNavLink>
                  </motion.li>
                ))}
              </ul>

              {/* フッター情報 */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-500">© 2024 enje.dev</p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/*
 * デスクトップ用ナビゲーションリンク
 */
const NavLink = ({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) => {
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative block py-2 px-3 transition-colors ${isActive ? "text-white" : "text-gray-400 hover:text-white"
          }`}
      >
        {children}
        <span
          className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-sky-600 transition-all duration-300 ease-out ${isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
            }`}
        />
      </Link>
    </Magnetic>
  );
};

/*
 * モバイル用ナビゲーションリンク
 */
const MobileNavLink = ({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) => {
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all ${isActive
        ? "bg-gradient-to-r from-cyan-500/20 to-sky-600/20 text-white border-l-2 border-cyan-500"
        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }`}
    >
      {children}
    </Link>
  );
};
