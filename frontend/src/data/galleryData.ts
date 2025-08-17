import type { TravelGallery } from "@/types/gallery";
import { generateBlurDataURL } from "@/lib/imageUtils";

/*
 *  
 */
export const galleryData: TravelGallery[] = [
  {
    id: "kyoto-2024",
    title: "京都の秋",
    location: "京都",
    date: "2024-11-15",
    description:
      "紅葉が美しい京都の寺院を巡りました。清水寺、金閣寺、嵐山など、秋の京都を満喫。",
    tags: ["日本", "紅葉", "寺院", "文化"],
    coverImage: {
      id: "kyoto-cover",
      src: "/gallery/kyoto/cover.svg",
      thumbnail: "/gallery/kyoto/cover.svg",
      alt: "京都の紅葉",
      width: 1920,
      height: 1280,
      blurDataURL: generateBlurDataURL("#d97706"),
    },
    images: [
      {
        id: "kyoto-1",
        src: "/gallery/kyoto/cover.svg",
        thumbnail: "/gallery/kyoto/cover.svg",
        alt: "清水寺の紅葉",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#d97706"),
      },
      {
        id: "kyoto-2",
        src: "/gallery/kyoto/cover.svg",
        thumbnail: "/gallery/kyoto/cover.svg",
        alt: "金閣寺",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#fbbf24"),
      },
      {
        id: "kyoto-3",
        src: "/gallery/kyoto/cover.svg",
        thumbnail: "/gallery/kyoto/cover.svg",
        alt: "嵐山の竹林",
        width: 1280,
        height: 1920,
        blurDataURL: generateBlurDataURL("#10b981"),
      },
    ],
  },
  {
    id: "hokkaido-2024",
    title: "北海道の冬",
    location: "北海道",
    date: "2024-02-10",
    description:
      "雪景色が広がる北海道。札幌雪まつり、小樽運河、美瑛の丘など、冬の北海道を堪能。",
    tags: ["日本", "雪", "冬", "自然"],
    coverImage: {
      id: "hokkaido-cover",
      src: "/gallery/hokkaido/cover.svg",
      thumbnail: "/gallery/hokkaido/cover.svg",
      alt: "北海道の雪景色",
      width: 1920,
      height: 1280,
      blurDataURL: generateBlurDataURL("#3b82f6"),
    },
    images: [
      {
        id: "hokkaido-1",
        src: "/gallery/hokkaido/cover.svg",
        thumbnail: "/gallery/hokkaido/cover.svg",
        alt: "札幌雪まつり",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#60a5fa"),
      },
      {
        id: "hokkaido-2",
        src: "/gallery/hokkaido/cover.svg",
        thumbnail: "/gallery/hokkaido/cover.svg",
        alt: "小樽運河",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#1e40af"),
      },
      {
        id: "hokkaido-3",
        src: "/gallery/hokkaido/cover.svg",
        thumbnail: "/gallery/hokkaido/cover.svg",
        alt: "美瑛の丘",
        width: 1920,
        height: 1080,
        blurDataURL: generateBlurDataURL("#dbeafe"),
      },
    ],
  },
  {
    id: "okinawa-2023",
    title: "沖縄の海",
    location: "沖縄",
    date: "2023-08-20",
    description:
      "エメラルドグリーンの海が広がる沖縄。シュノーケリング、ビーチリゾート、首里城など。",
    tags: ["日本", "海", "夏", "ビーチ"],
    coverImage: {
      id: "okinawa-cover",
      src: "/gallery/okinawa/cover.svg",
      thumbnail: "/gallery/okinawa/cover.svg",
      alt: "沖縄の海",
      width: 1920,
      height: 1280,
      blurDataURL: generateBlurDataURL("#06b6d4"),
    },
    images: [
      {
        id: "okinawa-1",
        src: "/gallery/okinawa/cover.svg",
        thumbnail: "/gallery/okinawa/cover.svg",
        alt: "エメラルドビーチ",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#22d3ee"),
      },
      {
        id: "okinawa-2",
        src: "/gallery/okinawa/cover.svg",
        thumbnail: "/gallery/okinawa/cover.svg",
        alt: "シュノーケリング",
        width: 1920,
        height: 1280,
        blurDataURL: generateBlurDataURL("#0891b2"),
      },
      {
        id: "okinawa-3",
        src: "/gallery/okinawa/cover.svg",
        thumbnail: "/gallery/okinawa/cover.svg",
        alt: "首里城",
        width: 1280,
        height: 1920,
        blurDataURL: generateBlurDataURL("#dc2626"),
      },
    ],
  },
];

/*
 * 撮影地域の取得
 */
export function getUniqueLocations(): string[] {
  return Array.from(new Set(galleryData.map((gallery) => gallery.location)));
}

/*
 * タグの取得
 */
export function getUniqueTags(): string[] {
  const allTags = galleryData.flatMap((gallery) => gallery.tags);
  return Array.from(new Set(allTags));
}

/*
 * フィルタリング
 */
export function filterGalleries(
  galleries: TravelGallery[],
  filters: {
    location?: string;
    dateRange?: { start: string; end: string };
    tags?: string[];
  },
): TravelGallery[] {
  return galleries.filter((gallery) => {
    // Filter by location
    if (filters.location && gallery.location !== filters.location) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange) {
      const galleryDate = new Date(gallery.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (galleryDate < startDate || galleryDate > endDate) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        gallery.tags.includes(tag),
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
}
