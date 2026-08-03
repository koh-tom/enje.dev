import type { ComponentProps } from "react";

/**
 * 最低限のアイコン。外部ライブラリを増やさず、線だけの手描き風 SVG で持つ。
 */
const paths = {
  github:
    "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  bluesky:
    "M12 10.8c-.9-1.8-3.4-5.1-5.7-6.7C4.1 2.5 3.2 2.8 2.6 3c-.7.3-.8 1.3-.8 1.9 0 .6.3 5 .5 5.7.7 2.4 3.2 3.2 5.5 3-3.4.5-6.4 1.7-2.4 6.1 4.3 4.5 5.9-1 6.6-3.7.7 2.7 1.6 8 6.6 3.7 3.8-4.4.9-5.6-2.5-6.1 2.3.2 4.8-.6 5.5-3 .2-.7.5-5.1.5-5.7 0-.6-.1-1.6-.8-1.9-.6-.2-1.5-.5-3.7 1.1-2.3 1.6-4.8 4.9-5.6 6.7z",
  book: "M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4zm16 0h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7V4z",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  moon: "M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  arrowLeft: "M19 12H5m7-7-7 7 7 7",
  arrowRight: "M5 12h14m-7-7 7 7-7 7",
  external:
    "M14 4h6v6m0-6-9 9M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5",
  mapPin:
    "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
} as const;

export type IconName = keyof typeof paths;

type IconProps = ComponentProps<"svg"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export function Icon({ name, size = 20, title, ...props }: IconProps) {
  const filled = name === "github" || name === "bluesky";
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: title が無いときは aria-hidden で装飾扱いにしている
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={paths[name]} />
    </svg>
  );
}
