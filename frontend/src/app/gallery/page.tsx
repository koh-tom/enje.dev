import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleries } from "@/content/gallery";
import { buildMetadata } from "@/lib/seo";

const description =
  "訪れた場所の美しい瞬間を写真で記録。日本各地の風景、文化、思い出のギャラリー。";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description,
  path: "/gallery",
});

export default function GalleryPage() {
  const sorted = [...galleries].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="flex flex-col gap-8">
      <SectionTitle as="h1" sub="Gallery">
        写真
      </SectionTitle>
      <GalleryBrowser galleries={sorted} />
    </div>
  );
}
