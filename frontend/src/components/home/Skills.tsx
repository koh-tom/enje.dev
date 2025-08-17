"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { FaRust, FaReact, FaPython, FaUbuntu, FaLinux } from "react-icons/fa";
import {
  SiZig,
  SiRuby,
  SiNextdotjs,
  SiVite,
  SiDocker,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCpp, TbBrandCSharp } from "react-icons/tb";

/*
 * スキルデータの定義
 * name: スキル名
 * proficiency: 習熟度(5が最高)
 * icon: 表示するアイコン
 */
const skills = [
  { name: "Ubuntu", proficiency: 5, icon: FaUbuntu },
  { name: "Zig", proficiency: 5, icon: SiZig },
  { name: "C++", proficiency: 5, icon: TbBrandCpp },
  { name: "Rust", proficiency: 4, icon: FaRust },
  { name: "TypeScript", proficiency: 4, icon: SiTypescript },
  { name: "Ruby", proficiency: 4, icon: SiRuby },
  { name: "Python", proficiency: 4, icon: FaPython },
  { name: "React", proficiency: 4, icon: FaReact },
  { name: "Next.js", proficiency: 4, icon: SiNextdotjs },
  { name: "Vite", proficiency: 4, icon: SiVite },
  { name: "Linux", proficiency: 4, icon: FaLinux },
  { name: "Docker", proficiency: 3, icon: SiDocker },
  { name: "PostgreSQL", proficiency: 3, icon: SiPostgresql },
  { name: "C#", proficiency: 3, icon: TbBrandCSharp },
];

// コンテナ全体のアニメーション設定（子要素を順番に表示）
const containerVariants = {
  hidden: { opacity: 0 }, // 最初は透明
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 0.1秒ごとに次の要素を表示
    },
  },
};

// 個々のアイテムのアニメーション設定（下からふわっと浮き上がる）
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

/*
 * Skillsセクションコンポーネント
 *
 * 技術スタックをカード形式で一覧表示。
 * Framer Motionを使用して、スクロール時に順番にフェードインするアニメーションを実装。
 */
export function Skills() {
  const skillsRef = useRef(null);
  // 画面内に入ったかどうかを検知（一度だけ発火、マージン-100pxで少し手前で発火）
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Skills / 技術スタック
        </h2>
        <motion.div
          ref={skillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <Card className="p-6 bg-gray-800 border-gray-700 flex flex-col items-center w-36">
                <div className="text-4xl mb-2">
                  <skill.icon className="w-10 h-10 text-white" />
                </div>
                <p className="font-semibold text-white">{skill.name}</p>
                {/* 習熟度を表す5段階のドット表示 */}
                <div className="flex justify-center mt-2 gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={`${skill.name}-dot-${i}`}
                      className={`block w-3 h-3 rounded-full ${i < skill.proficiency ? "bg-blue-500" : "bg-gray-600"}`}
                    ></span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
