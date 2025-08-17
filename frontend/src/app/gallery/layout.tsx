import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "旅の記録 | Gallery",
  description:
    "訪れた場所の美しい瞬間を写真で記録。日本各地の風景、文化、思い出のギャラリー。",
  openGraph: {
    title: "旅の記録 | Travel Gallery",
    description: "訪れた場所の美しい瞬間を写真で記録",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
