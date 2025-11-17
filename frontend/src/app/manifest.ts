import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "enje.dev | Web開発 ⇔ FPGA研究",
    short_name: "enje.dev",
    description:
      "Web開発とFPGA研究に関するポートフォリオ＆技術ブログ。ポートフォリオ、制作したWebアプリケーションやFPGAなどのハードウェア開発に関するブログ記事、写真ギャラリーなどを掲載しています。",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
