"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Mic, BookOpen, Code, Star, User } from "lucide-react";

type AchievementCategory =
  | "award"
  | "certification"
  | "talk"
  | "publication"
  | "competition"
  | "staff"
  | "other";

interface Achievement {
  date: string; // "2023.05" 形式
  title: string;
  category: AchievementCategory;
  description?: string;
}

const achievements: Achievement[] = [
  {
    date: "2025.11",
    title: "CODE BLUE学生スタッフ参加",
    category: "staff",
    description: "学生スタッフとして参加",
  },
  {
    date: "2025.10",
    title: "IEEE The 22nd EPCR Excellent Award",
    category: "award",
    description:
      "An emulator of path planning algorithms to evaluate pipelined FPGA accelerator architectures",
  },
  {
    date: "2022.08",
    title: "TOEIC 930点",
    category: "certification",
  },
];

const categoryConfig: Record<
  AchievementCategory,
  { icon: typeof Trophy; color: string; label: string }
> = {
  award: { icon: Trophy, color: "text-yellow-400", label: "受賞" },
  certification: { icon: Award, color: "text-blue-400", label: "資格" },
  talk: { icon: Mic, color: "text-purple-400", label: "登壇" },
  publication: { icon: BookOpen, color: "text-green-400", label: "執筆" },
  competition: { icon: Code, color: "text-orange-400", label: "競技" },
  staff: { icon: User, color: "text-orange-400", label: "スタッフ" },
  other: { icon: Star, color: "text-gray-400", label: "その他" },
};

export function Achievements() {
  if (achievements.length === 0) {
    return null; // 実績がない場合は表示しない
  }

  // 日付を古い順にソート（時系列順）
  const sortedAchievements = [...achievements].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Achievements / 実績
          </h2>
        </motion.div>

        <div className="space-y-4">
          {sortedAchievements.map((achievement, index) => {
            const config = categoryConfig[achievement.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-gray-900/40 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all"
              >
                {/* 日付 */}
                <div className="flex-shrink-0 w-20 text-sm font-mono text-gray-400">
                  {achievement.date}
                </div>

                {/* アイコン */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center ${config.color}`}
                >
                  <Icon size={20} />
                </div>

                {/* 内容 */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-white font-bold">{achievement.title}</h3>
                  {achievement.description && (
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {achievement.description}
                    </p>
                  )}
                </div>

                {/* カテゴリラベル */}
                <div
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full ${config.color} bg-gray-800`}
                >
                  {config.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
