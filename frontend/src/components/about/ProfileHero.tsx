"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProfileHero() {
  return (
    <section className="relative h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden bg-black text-white">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />

      <div className="z-10 flex flex-col items-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
        >
          {/* プロフィール画像プレースホルダー */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
            <Image
              src="/images/prof.png"
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
            enje / Koh TOMITA
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Software Engineer / Web Developer
          </p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl text-gray-300 leading-relaxed"
        >
          FPGA/Computer Perfomance/Algorithm
          <br className="hidden md:block" />
          C/C++/Assembly/Verilog/React/Rust/Ruby/Julia
        </motion.p>
      </div>
    </section>
  );
}
