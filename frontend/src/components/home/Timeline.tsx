"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface TimelineEvent {
  id: string; // ユニークなID
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "university-2022",
    year: "2022 -",
    title: "大学入学",
    description: "工学部にて情報工学について勉強中。",
  },
  {
    id: "venture-2023",
    year: "2023",
    title: "ベンチャー企業にてアルバイト",
    description: "ベンチャー企業にてシミュレーション構築のアルバイト。",
  },
  {
    id: "engineer-2024",
    year: "2024 -",
    title: "エンジニアバイト",
    description: "Web開発のエンジニアバイト。",
  },
  {
    id: "now-exploring",
    year: "Now",
    title: "新しい技術の探求",
    description: "常に新しい技術を学び、挑戦中。",
  },
];

export function Timeline() {
  return (
    <section
      id="timeline"
      className="py-20 bg-gray-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-20 tracking-wider"
        >
          これまでの歩み
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* 中央の幹 (Trunk) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 md:-translate-x-1/2" />

          <div className="space-y-0">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TimelineItem = ({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center justify-between md:justify-normal md:gap-12 mb-12 md:mb-24 ${
        isEven ? "flex-row-reverse md:flex-row" : "flex-row-reverse"
      }`}
    >
      {/* PC表示時のスペーサー (反対側のスペース) - 幅を広げてコンテンツを外側に押し出す */}
      <div className="hidden md:block w-1/2" />

      {/* 中央の接続点 (Node) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 z-10" />

      {/* コンテンツエリア - 幅を少し狭めて幹から離す */}
      <div className={`w-[calc(100%-3rem)] md:w-5/12 pl-12 md:pl-0 relative`}>
        {/* 枝 (Branch) - 幹に向かって伸びる線 - 長さを調整 */}
        <div
          className={`absolute top-1/2 h-0.5 bg-gray-600 hidden md:block
            ${isEven ? "left-[-20%] w-[20%]" : "right-[-20%] w-[20%]"}
          `}
        />
        {/* モバイル用の枝 */}
        <div className="absolute left-[-2rem] top-1/2 w-8 h-0.5 bg-gray-600 md:hidden" />

        <Card className="relative p-6 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors w-full">
          <div className="flex flex-col gap-1">
            <span className="text-blue-400 font-mono text-sm font-bold">
              {event.year}
            </span>
            <h3 className="text-xl font-bold text-white">{event.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              {event.description}
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
