"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/ui/magnetic";

/*
 * ヘッダーコンポーネント
 *
 * サイトのグローバルナビゲーション。
 * 視認性を重視し、背景は濃い色で統一。スクロール追従(sticky)させつつ、
 * コンテンツの邪魔にならないよう高さを調整しています。
 */
export const Header = ({ title }: { title?: string }) => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-center px-6 md:px-12 relative">
        {/* ロゴまたはサイト名 (常に左端に表示) */}
        <div className="absolute left-6 md:left-12 z-10">
          <Magnetic>
            <Link
              href="/"
              className="text-xl font-bold tracking-wider text-white hover:text-gray-300 transition-colors block"
            >
              enje's Portfolio & Blog
            </Link>
          </Magnetic>
        </div>

        {/* ページタイトル (title prop がある場合のみ中央に表示) */}
        {title && (
          <h1 className="text-xl font-bold tracking-wider text-white text-center max-w-xs truncate z-0">
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </h1>
        )}

        <div className="absolute right-6 md:right-12 flex items-center gap-8 z-10">
          {/* ナビゲーション: リンク間の余白を広めに確保 */}
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium text-gray-300">
              <li>
                <NavLink href="/" pathname={pathname}>Home</NavLink>
              </li>
              <li>
                <NavLink href="/portfolio" pathname={pathname}>Portfolio</NavLink>
              </li>
              <li>
                <NavLink href="/blog" pathname={pathname}>Blog</NavLink>
              </li>
              <li>
                <NavLink href="/gallery" pathname={pathname}>Gallery</NavLink>
              </li>
              <li>
                <NavLink href="/about" pathname={pathname}>About</NavLink>
              </li>
              <li>
                <NavLink href="/contact" pathname={pathname}>Contact</NavLink>
              </li>
            </ul>
          </nav>

          {/* テーマ切り替え */}
          <Magnetic>
            <div className="inline-block">
              <ModeToggle />
            </div>
          </Magnetic>
        </div>
      </div>
    </header>
  );
};

/*
 * ナビゲーションリンクコンポーネント
 *
 * ホバー時に文字色が明るくなり、下線が中央から広がるアニメーションを提供します。
 * アクティブページは下線でハイライト表示されます。
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
  // アクティブ判定: 完全一致 or 子ページ（/blog/xxx など）
  const isActive = href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative block py-2 px-3 transition-colors ${isActive
          ? "text-white"
          : "text-gray-400 hover:text-white"
          }`}
      >
        {children}
        {/* 下線: アクティブ時は常に表示、非アクティブ時はホバーで表示 */}
        <span
          className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-sky-600 transition-all duration-300 ease-out ${isActive
            ? "w-1/2"
            : "w-0 group-hover:w-1/2"
            }`}
        />
      </Link>
    </Magnetic>
  );
};

