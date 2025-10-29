import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientHeader } from "@/components/layout/ClientHeader";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ThemeProvider } from "@/components/theme-provider";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enje.dev"),
  title: {
    default: "enje.dev | Web開発 ⇔ FPGA研究",
    template: "%s | enje.dev",
  },
  description:
    "Web開発とFPGA研究に関するポートフォリオ＆技術ブログ。ポートフォリオ、制作したWebアプリケーションやFPGAなどのハードウェア開発に関するブログ記事、写真ギャラリーなどを掲載しています。",
  keywords: [
    "enje",
    "enje.dev",
    "Web開発",
    "FPGA",
    "ハードウェア開発",
    "React",
    "Next.js",
    "Ruby on Rails",
    "電子工作",
    "技術ブログ",
    "ポートフォリオ",
  ],
  authors: [{ name: "enje", url: "https://enje.dev" }],
  creator: "enje",
  openGraph: {
    title: "enje.dev | Web開発 ⇔ FPGA研究",
    description:
      "Web開発とFPGA研究に関するポートフォリオ＆技術ブログ。制作したWebアプリケーションやFPGAなどのハードウェア開発に関するブログ記事、写真ギャラリーなどを掲載しています。",
    url: "https://enje.dev",
    siteName: "enje.dev",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "enje.dev | Web開発 ⇔ FPGA研究",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "enje.dev | Web開発 ⇔ FPGA研究",
    description:
      "Web開発とFPGA研究に関するポートフォリオ＆技術ブログ。制作したWebアプリケーションやFPGAなどのハードウェア開発に関するブログ記事、写真ギャラリーなどを掲載しています。",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://enje.dev",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <ScrollProgress />
          <ClientHeader />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
