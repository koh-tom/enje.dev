"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaLinux, FaPython, FaReact, FaRust, FaUbuntu } from "react-icons/fa";
import {
  SiDocker,
  SiNextdotjs,
  SiPostgresql,
  SiRuby,
  SiTypescript,
  SiVite,
  SiZig,
} from "react-icons/si";
import { TbBrandCpp, TbBrandCSharp } from "react-icons/tb";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

/*
 * スキルデータの定義
 * name: スキル名
 * proficiency: 習熟度(5が最高)
 * icon: 表示するアイコン
 * color: ブランドカラー
 */
const skills = [
  { name: "Ubuntu", proficiency: 5, icon: FaUbuntu, color: "text-[#E95420]" }, // Ubuntu Orange
  { name: "Zig", proficiency: 5, icon: SiZig, color: "text-[#F7A41D]" }, // Zig Orange
  { name: "C++", proficiency: 5, icon: TbBrandCpp, color: "text-[#00599C]" }, // C++ Blue
  { name: "Rust", proficiency: 4, icon: FaRust, color: "text-[#DEA584]" }, // Rust Orange/Brown
  {
    name: "TypeScript",
    proficiency: 4,
    icon: SiTypescript,
    color: "text-[#3178C6]",
  }, // TypeScript Blue
  { name: "Ruby", proficiency: 4, icon: SiRuby, color: "text-[#CC342D]" }, // Ruby Red
  { name: "Python", proficiency: 4, icon: FaPython, color: "text-[#3776AB]" }, // Python Blue
  { name: "React", proficiency: 4, icon: FaReact, color: "text-[#61DAFB]" }, // React Cyan
  { name: "Next.js", proficiency: 4, icon: SiNextdotjs, color: "text-white" }, // Next.js White
  { name: "Vite", proficiency: 4, icon: SiVite, color: "text-[#646CFF]" }, // Vite Purple
  { name: "Linux", proficiency: 4, icon: FaLinux, color: "text-[#FCC624]" }, // Linux Yellow (Tux)
  { name: "Docker", proficiency: 3, icon: SiDocker, color: "text-[#2496ED]" }, // Docker Blue
  {
    name: "PostgreSQL",
    proficiency: 3,
    icon: SiPostgresql,
    color: "text-[#4169E1]",
  }, // PostgreSQL Blue
  { name: "C#", proficiency: 3, icon: TbBrandCSharp, color: "text-[#512BD4]" }, // C# Purple
];

// スキルを2つのグループに分割（上段と下段で逆方向に流す）
const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));

/**
 * 元のスキルカードコンポーネント（デザインそのまま + ブランドカラー）
 */
function SkillCard({ skill }: { skill: (typeof skills)[0] }) {
  const Icon = skill.icon;

  return (
    <Card className="p-6 bg-gray-800 border-gray-700 flex flex-col items-center w-36">
      <div className="text-4xl mb-2">
        <Icon className={`w-10 h-10 ${skill.color}`} />
      </div>
      <p className="font-semibold text-white">{skill.name}</p>
      {/* 習熟度を表す5段階のドット表示 */}
      <div className="flex justify-center mt-2 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={`${skill.name}-dot-${i}`}
            className={`block w-3 h-3 rounded-full ${
              i < skill.proficiency ? "bg-blue-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </Card>
  );
}

/*
 * Skillsセクションコンポーネント
 *
 * 技術スタックを無限スクロールするMarqueeで表示。
 * 上段は左から右、下段は右から左に流れる。
 * カードデザインは元のまま維持。
 */
export function Skills() {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-20 bg-gray-900 text-white overflow-hidden"
    >
      <div className="container mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Skills / 技術スタック
        </motion.h2>
      </div>

      <div ref={skillsRef} className="relative">
        {/* グラデーションマスク（左右フェードアウト） */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        {/* 上段（左から右） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Marquee pauseOnHover speed={40}>
            {firstRow.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </motion.div>

        {/* 下段（右から左） */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4"
        >
          <Marquee pauseOnHover reverse speed={40}>
            {secondRow.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
