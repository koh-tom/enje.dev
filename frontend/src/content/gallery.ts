import type { Gallery } from "@/types/gallery";

/**
 * 写真ギャラリーの中身。オーナーが手で編集するファイル。
 * 画像は frontend/public/gallery/<slug>/ に置く。
 * 現在はサンプルの SVG のみ。実際の写真に差し替える。
 */
export const galleries: Gallery[] = [
  {
    slug: "kyoto-2024",
    title: "京都の秋",
    location: "京都",
    date: "2024-11-15",
    description:
      "紅葉が美しい京都の寺院を巡りました。清水寺、金閣寺、嵐山など、秋の京都を満喫。",
    tags: ["日本", "紅葉", "寺院", "文化"],
    cover: {
      src: "/gallery/kyoto/cover.svg",
      alt: "京都の紅葉",
      width: 1920,
      height: 1280,
    },
    images: [
      {
        src: "/gallery/kyoto/cover.svg",
        alt: "清水寺の紅葉",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/kyoto/cover.svg",
        alt: "金閣寺",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/kyoto/cover.svg",
        alt: "嵐山の竹林",
        width: 1280,
        height: 1920,
      },
    ],
  },
  {
    slug: "hokkaido-2024",
    title: "北海道の冬",
    location: "北海道",
    date: "2024-02-10",
    description:
      "雪景色が広がる北海道。札幌雪まつり、小樽運河、美瑛の丘など、冬の北海道を堪能。",
    tags: ["日本", "雪", "冬", "自然"],
    cover: {
      src: "/gallery/hokkaido/cover.svg",
      alt: "北海道の雪景色",
      width: 1920,
      height: 1280,
    },
    images: [
      {
        src: "/gallery/hokkaido/cover.svg",
        alt: "札幌雪まつり",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/hokkaido/cover.svg",
        alt: "小樽運河",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/hokkaido/cover.svg",
        alt: "美瑛の丘",
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    slug: "okinawa-2023",
    title: "沖縄の海",
    location: "沖縄",
    date: "2023-08-20",
    description:
      "エメラルドグリーンの海が広がる沖縄。シュノーケリング、ビーチリゾート、首里城など。",
    tags: ["日本", "海", "夏", "ビーチ"],
    cover: {
      src: "/gallery/okinawa/cover.svg",
      alt: "沖縄の海",
      width: 1920,
      height: 1280,
    },
    images: [
      {
        src: "/gallery/okinawa/cover.svg",
        alt: "エメラルドビーチ",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/okinawa/cover.svg",
        alt: "シュノーケリング",
        width: 1920,
        height: 1280,
      },
      {
        src: "/gallery/okinawa/cover.svg",
        alt: "首里城",
        width: 1280,
        height: 1920,
      },
    ],
  },
];

export const galleryLocations = Array.from(
  new Set(galleries.map((g) => g.location)),
);
export const galleryTags = Array.from(
  new Set(galleries.flatMap((g) => g.tags)),
);
