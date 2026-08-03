import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono, Zen_Kurenaido } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildMetadata, jsonLd, SITE } from "@/lib/seo";

const body = Zen_Kurenaido({
  weight: "400",
  subsets: ["latin"],
  preload: false,
  variable: "--font-body",
  display: "swap",
});

const display = Caveat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({ path: "" }),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#132257" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={jsonLd.website()} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:outline-2"
          >
            本文へ移動
          </a>
          <Header />
          <main
            id="main"
            className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
