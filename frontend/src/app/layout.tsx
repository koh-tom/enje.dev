"use client"; // クライアントコンポーネントとして宣言

import type { Metadata } from "next"; // Metadataのインポートはサーバーコンポーネントでのみ可能だが、型定義として残す
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation"; // usePathnameをインポート

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadataはサーバーコンポーネントでのみエクスポート可能。クライアントコンポーネントでは動的に設定する必要があるが、ここでは便宜上コメントアウト
// export const metadata: Metadata = {
//   title: "enje.dev",
//   description: "A portfolio and blog by a passionate developer.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isBlogPostPage = /^\/blog\/.+/.test(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!isBlogPostPage && <Header />}{" "}
          {/* ブログ記事ページ以外でHeaderを表示 */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
