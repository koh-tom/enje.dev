"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(
  () => import("@/components/home/Scene3D").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  },
);

/*
 * Heroセクション
 *
 * 背景の動的なグリッド、マウスに追従するスポットライト、
 * テキストの出現アニメーションを組み合わせています。
 */
export function Hero() {
  // スクロールに応じたパララックス効果
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* 背景: 動的なグリッドとスポットライト */}
      <div className="absolute inset-0 z-0">
        {/* 3Dシーン */}
        <Scene3D />

        {/* 流れるバイナリコード */}
        <BinaryRain />

        {/* グリッドパターン */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* メインコンテンツ */}
      <div className="z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          className="mb-8"
        >
          <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
            ポートフォリオ & ブログへようこそ
          </span>
        </motion.div>

        <motion.h1
          className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          style={{ y: y2 }}
        >
          <span className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            enje
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl text-gray-400 mt-2">
            Portfolio & Blog
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ y: y1 }}
        >
          Web開発 ⇔ FPGA研究
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-black hover:bg-gray-200 transition-all hover:scale-105"
          >
            <Link href="/portfolio">プロジェクトを見る</Link>
          </Button>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors"
          >
            自己紹介 <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            SCROLL
          </span>
          <motion.div
            className="h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-500 to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/*
 * バイナリコードが流れるアニメーション背景
 *
 * 複数の列でランダムに0と1が上から下に流れる演出を提供します。
 * SSRとクライアントでの不一致を避けるため、クライアントサイドでのみレンダリングします。
 */
const BinaryRain = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const columns = 20; // 列の数
  const codeSnippets = [
    "01001000 01100101 01101100 01101100 01101111",
    "01010111 01101111 01110010 01101100 01100100",
    "const x = () => {}",
    "function main()",
    "if (true) return",
    "while (i < n)",
    "for (let i = 0)",
    "async await",
    "import { React }",
    "export default",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none z-0">
      {Array.from({ length: columns }).map((_, i) => {
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute top-0 text-xs font-mono text-green-600"
            style={{
              left: `${(i / columns) * 100}%`,
            }}
            initial={{ y: -100 }}
            animate={{
              y: "100vh",
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => {
              const rand = Math.random();
              const content =
                rand > 0.7
                  ? codeSnippets[
                      Math.floor(Math.random() * codeSnippets.length)
                    ]
                  : rand > 0.5
                    ? "1"
                    : "0";

              return (
                <div key={j} className="py-1">
                  {content}
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};
