import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

/**
 * ヘッダーコンポーネント
 *
 * サイトのグローバルナビゲーション。
 * 視認性を重視し、背景は濃い色で統一。スクロール追従(sticky)させつつ、
 * コンテンツの邪魔にならないよう高さを調整しています。
 */
export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
        {/* ロゴ: シンプルかつ力強く */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wider text-white hover:text-gray-300 transition-colors"
        >
          enje's Portfolio & Blog
        </Link>

        <div className="flex items-center gap-8">
          {/* ナビゲーション: リンク間の余白を広めに確保 */}
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium text-gray-300">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/portfolio">Portfolio</NavLink>
              </li>
              <li>
                <NavLink href="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink href="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
              <li>
                <NavLink href="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>

          {/* テーマ切り替え */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

/**
 * ナビゲーションリンクコンポーネント
 *
 * ホバー時に文字色が明るくなり、下線が中央から広がるアニメーションを提供します。
 */
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="group relative py-1 transition-colors hover:text-white"
    >
      {children}
      {/* 下線アニメーション: 中央から左右に広がる */}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  );
};
