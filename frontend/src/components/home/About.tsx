"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaBluesky, FaGithub } from "react-icons/fa6";
import { BsJournals } from "react-icons/bs";

/*
 * SNS系リンクの定義リスト
 */
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/koh-tom",
    icon: FaGithub,
    className: "text-gray-400 hover:text-white transition-colors",
  },
  {
    name: "BlueSky",
    url: "https://bsky.app/profile/coysdaje.bsky.social",
    icon: FaBluesky,
    className: "text-blue-500 hover:text-blue-400 transition-colors",
  },
  {
    name: "Sizu",
    url: "https://sizu.me/enje",
    icon: BsJournals,
    className: "text-white hover:text-gray transition-colors",
  },
];

/*
 * 趣味・属性のタグリスト
 */
const interests = [
  "Student",
  "Researcher",
  "FPGA",
  "Computer Performance",
  "Algorithm",
  "Tottenham Hotspur",
  "Azzurri",
  "Hokkaido Nippon-Ham Fighters",
  "Shogi (Yagura)",
  "Theater",
  "Movies",
  "Reading",
];

/*
 * Aboutセクションコンポーネント
 *
 * プロフ画像、自己紹介文、SNSリンクを表示
 * デザイン強化：背景装飾、アニメーション、タグ表示
 */
export function About() {
  return (
    <section
      id="about"
      className="relative py-28 px-4 md:px-8 bg-black text-white overflow-hidden"
    >
      {/* 背景装飾: グラデーションとBlur効果で奥行きを表現 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* プロフィール画像エリア (4/12 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 flex justify-center md:justify-end"
          >
            <div className="relative group">
              {/* 画像の装飾枠 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-full p-1 bg-black">
                <Image
                  src="/images/enje.png"
                  alt="enje"
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* コンテンツエリア (8/12 columns) */}
          <motion.div
            className="md:col-span-8 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Software Engineer / Researcher
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600">
                Bridging Hardware & Software
              </span>
            </h3>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              Webアプリケーション開発からFPGAまで幅広い技術領域を学ぶ、ソフトウェアエンジニア志望の大学生です。
              <br />
              低レイヤーからWebフロントエンドまで、幅広い技術領域に興味を持ち、
              特にコンピュータパフォーマンスやアルゴリズムの研究に取り組んでいます。
            </p>

            {/* 趣味・属性タグクラウド */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
              {interests.map((tag, _index) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm font-medium text-gray-300 bg-gray-900/80 border border-gray-800 rounded-full hover:border-blue-500 hover:text-blue-400 hover:bg-gray-800 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* SNSリンク & 詳細ボタン */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.className} transform hover:scale-110 transition-transform`}
                    aria-label={link.name}
                  >
                    <link.icon size={32} />
                  </a>
                ))}
              </div>

              <Link
                href="/about"
                className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <span>Read More</span>
                <span className="bg-black text-white p-1 rounded-full group-hover:rotate-[-45deg] transition-transform duration-300">
                  <FaArrowRight size={12} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
