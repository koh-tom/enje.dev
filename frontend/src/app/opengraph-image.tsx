import { OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE } from "@/lib/seo";

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: SITE.title,
    kicker: "Portfolio & Blog",
    tags: ["Web", "FPGA", "Algorithm"],
  });
}
