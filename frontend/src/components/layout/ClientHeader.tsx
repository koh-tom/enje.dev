"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const ClientHeader = () => {
  const pathname = usePathname();
  const isBlogPostPage = /^\/blog\/.+/.test(pathname);

  if (isBlogPostPage) {
    return null;
  }

  return <Header />;
};
