"use client";

import { motion } from "framer-motion";
import {
  FaLaptop,
  FaCode,
  FaTerminal,
  FaKeyboard,
  FaGithub,
  FaDesktop,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";

const ToolIcon = ({
  IconComponent,
  color,
}: {
  IconComponent: any;
  color: string;
}) => (
  <div
    className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4 ${color}`}
  >
    <IconComponent size={24} />
  </div>
);

const toolkit = [
  {
    IconComponent: FaLaptop,
    title: "ラップトップ",
    description:
      "ThinkPad X1 Carbon 6th Gen 16GB 2TB(換装)\nThinkPad P1 4th Gen 16GB 512GB SSD\n",
    color: "text-gray-400",
  },
  {
    IconComponent: FaDesktop,
    title: "デスクトップ",
    description: "i7-14700KF RTX4080 64GB 2TB・1TB\n",
    color: "text-blue-500",
  },
  {
    IconComponent: IoSettings,
    title: "OS",
    description: "Ubuntu 24.04 LTS\nWindows 11 Pro\nOmarchy",
    color: "text-gray-400",
  },
  {
    IconComponent: FaKeyboard,
    title: "キーボード",
    description: "HHKB Studio 雪 日本語配列\n ThinkPad Keyboard",
    color: "text-red-500",
  },
  {
    IconComponent: MdEditDocument,
    title: "エディタ",
    description: "VSCode\n Neovim",
    color: "text-cyan-400",
  },
  {
    IconComponent: FaTerminal,
    title: "ターミナル",
    description: "Ghosty",
    color: "text-cyan-400",
  },
];

export function Philosophy() {
  return (
    <section className="py-24 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Developer Toolkit / 開発環境
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolkit.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/40 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all hover:scale-105"
            >
              <ToolIcon IconComponent={tool.IconComponent} color={tool.color} />
              <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
              <div className="text-gray-400 text-sm leading-relaxed">
                {tool.description.split("\n").map((line, i) => (
                  <p key={i} className={line.trim() ? "" : "h-2"}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
