"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Mic, BookOpen, Code, Star, User } from "lucide-react";

type AchievementCategory = "award" | "certification" | "talk" | "publication" | "competition" | "staff" | "other";

interface Achievement {
    date: string; // "2023.05" 形式
    title: string;
    category: AchievementCategory;
    description?: string;
}

const achievements: Achievement[] = [
    {
        date: "2022.08",
        title: "TOEIC 930点",
        category: "certification",
    },
    {
        date: "2025.10",
        title: "IEEE The 22nd English Presentation Competition in Ritsumeikan Excellent Award",
        category: "award",
        description: "An emulator of path planning algorithms to evaluate pipelined FPGA accelerator architectures",
    },
    {
        date: "2025.11",
        title: "CODE BLUE学生スタッフ参加",
        category: "staff",
        description: "学生スタッフとして参加",
    },
];

const categoryConfig: Record<AchievementCategory, { icon: typeof Trophy; color: string; label: string }> = {
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

    return (
        <section className="py-16 px-4 md:px-8 bg-gray-900/50">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-12 text-white"
                >
                    Achievements / 実績
                </motion.h2>

                <div className="space-y-4">
                    {achievements.map((achievement, index) => {
                        const config = categoryConfig[achievement.category];
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors"
                            >
                                {/* 日付 */}
                                <div className="flex-shrink-0 w-20 text-sm font-mono text-gray-400">
                                    {achievement.date}
                                </div>

                                {/* アイコン */}
                                <div className={`flex-shrink-0 ${config.color}`}>
                                    <Icon size={20} />
                                </div>

                                {/* 内容 */}
                                <div className="flex-grow">
                                    <h3 className="text-white font-medium">{achievement.title}</h3>
                                    {achievement.description && (
                                        <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                                    )}
                                </div>

                                {/* カテゴリラベル */}
                                <div className={`flex-shrink-0 text-xs px-2 py-1 rounded ${config.color} bg-gray-700/50`}>
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
