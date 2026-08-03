/** サイト全体で共有する静的データ（ナビ、SNS） */

export const navLinks = [
  { href: "/", label: "Home", ja: "ホーム" },
  { href: "/blog", label: "Blog", ja: "記事" },
  { href: "/portfolio", label: "Works", ja: "制作物" },
  { href: "/gallery", label: "Gallery", ja: "写真" },
  { href: "/about", label: "About", ja: "自己紹介" },
  { href: "/contact", label: "Contact", ja: "連絡" },
] as const;

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/koh-tom", icon: "github" },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/coysdaje.bsky.social",
    icon: "bluesky",
  },
  { name: "sizu.me", href: "https://sizu.me/enje", icon: "book" },
] as const;

export const owner = {
  name: "Koh TOMITA",
  handle: "enje",
  location: "Tsukuba, Japan",
} as const;
