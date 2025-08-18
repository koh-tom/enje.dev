"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaGithub, FaBluesky } from "react-icons/fa6";
import { SiZig } from "react-icons/si";
import Link from "next/link";
import { FaRust, FaReact, FaLinux, FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";

// Bento Gridの各アイテムをラップするコンポーネント (スクロール連動アニメーション付き)
const BentoItem = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`h-full ${className}`}
  >
    <Card className="h-full bg-gray-900/50 text-white border-gray-800 hover:border-gray-700 transition-colors p-6 overflow-hidden relative group">
      {children}
    </Card>
  </motion.div>
);

interface InterestItem {
  emoji: string;
  label: string;
  detail: string;
  icon?: React.ReactNode;
}

type CategoryType = "sports" | "hobbies";

// カテゴリ別の趣味・関心セクション
// スポーツと趣味をタブで切り替えられるようにコントロール
function InterestsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("sports");

  const categories: Record<CategoryType, InterestItem[]> = {
    sports: [
      { emoji: "⚽", label: "Spurs", detail: "Tottenham Hotspur - COYS!" },
      { emoji: "🇮🇹", label: "Azzurri", detail: "Italian National Team" },
      { emoji: "⚾", label: "Fighters", detail: "北海道日本ハムファイターズ" },
    ],
    hobbies: [
      { emoji: "🎭", label: "Theater", detail: "観劇・舞台鑑賞" },
      { emoji: "🎬", label: "Movies", detail: "映画鑑賞" },
      { emoji: "☗", label: "Shogi", detail: "居飛車党 (矢倉)" },
    ],
  };

  const categoryLabels: Record<CategoryType, string> = {
    sports: "Sports",
    hobbies: "Hobbies",
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">
          趣味・関心
        </h3>

        {/* カテゴリタブ */}
        <div className="flex gap-2">
          {(Object.keys(categories) as Array<keyof typeof categories>).map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-[10px] rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ),
          )}
        </div>
      </div>

      {/* 興味・関心のアイテム一覧 */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-3"
      >
        {categories[activeCategory].map((interest, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center gap-2 relative group cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center ${interest.icon ? "text-yellow-500" : "text-2xl"} group-hover:bg-gray-700 transition-colors`}
            >
              {interest.icon || interest.emoji}
            </div>
            <span className="text-xs text-center">{interest.label}</span>

            {/* ツールチップ */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-gray-950 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700 shadow-lg">
                {interest.detail}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-gray-950" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          At a Glance / ハイライト
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-auto md:h-[600px]">
          {/* 1. Location (Large) */}
          <BentoItem className="md:col-span-2 md:row-span-1" delay={0.1}>
            <div className="flex items-center justify-between h-full">
              <div>
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                  拠点
                </h3>
                <p className="text-3xl font-bold flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> Tsukuba, Japan
                </p>
              </div>
              <div className="text-6xl opacity-100 rotate-12">🇯🇵</div>
            </div>
          </BentoItem>

          {/* 2. Stats (Small) */}
          <BentoItem className="md:col-span-1 md:row-span-1" delay={0.2}>
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                Articles
              </h3>
              <p className="text-5xl font-bold text-blue-500">30+</p>
              <p className="text-sm text-gray-500">Tech Blog Posts</p>
            </div>
          </BentoItem>

          {/* 3. Tech Stack (Tall) */}
          <BentoItem className="md:col-span-1 md:row-span-2" delay={0.3}>
            <div className="flex flex-col h-full">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4">
                技術スタック
              </h3>
              <div className="flex flex-col gap-4 flex-grow justify-center">
                <div className="flex items-center gap-3 text-lg">
                  <FaRust className="text-orange-500" /> Rust
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <FaLinux className="text-yellow-400" /> Linux
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <SiZig className="text-orange-400" /> Zig
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <FaReact className="text-cyan-400" /> React
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <TbBrandCpp className="text-blue-500" /> C++
                </div>
              </div>
            </div>
          </BentoItem>

          {/* 4. Interests (Large) */}
          <BentoItem className="md:col-span-2 md:row-span-1" delay={0.4}>
            <InterestsSection />
          </BentoItem>

          {/* 5. Socials (Wide) */}
          <BentoItem className="md:col-span-2 md:row-span-1" delay={0.5}>
            <div className="flex items-center justify-between h-full">
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                SNS連携
              </h3>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/koh-tom"
                  target="_blank"
                  className="p-3 bg-gray-800 rounded-full hover:bg-white hover:text-black transition-all"
                >
                  <FaGithub size={24} />
                </Link>
                <Link
                  href="https://bsky.app/profile/coysdaje.bsky.social"
                  target="_blank"
                  className="p-3 bg-gray-800 rounded-full hover:bg-white hover:text-black transition-all"
                >
                  <FaBluesky size={24} />
                </Link>
              </div>
            </div>
          </BentoItem>
        </div>
      </div>
    </section>
  );
}
