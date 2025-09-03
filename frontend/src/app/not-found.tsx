"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * タイプライター効果でログを表示
 */
function TerminalLog({
  logs,
  onComplete,
}: {
  logs: { text: string; type: "info" | "error" | "warn" | "success" }[];
  onComplete?: () => void;
}) {
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLogs >= logs.length) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    const currentLog = logs[visibleLogs];
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex < currentLog.text.length) {
        setCurrentText(currentLog.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setVisibleLogs((prev) => prev + 1);
          setCurrentText("");
        }, 100);
      }
    }, 20);

    return () => clearInterval(typeTimer);
  }, [visibleLogs, logs, onComplete]);

  const getTextColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="space-y-1">
      {logs.slice(0, visibleLogs).map((log, index) => (
        <div key={`log-${index}`} className={`${getTextColor(log.type)}`}>
          {log.text}
        </div>
      ))}
      {visibleLogs < logs.length && (
        <div className={getTextColor(logs[visibleLogs].type)}>
          {currentText}
          <span className="animate-pulse">▌</span>
        </div>
      )}
      {!isTyping && (
        <div className="text-gray-500 animate-pulse">
          <span className="text-green-400">$</span> _
        </div>
      )}
    </div>
  );
}

/**
 * 404 Not Found ページ - ターミナルテーマ
 */
export default function NotFound() {
  const [showButtons, setShowButtons] = useState(false);

  const errorLogs: { text: string; type: "info" | "error" | "warn" | "success" }[] = [
    { text: "$ curl -X GET /requested-page", type: "info" },
    { text: "", type: "info" },
    { text: "[INFO]  Initializing route resolver...", type: "info" },
    { text: "[INFO]  Scanning available endpoints...", type: "info" },
    { text: "[WARN]  Route pattern match failed", type: "warn" },
    { text: "[ERROR] HTTP 404: Resource not found", type: "error" },
    { text: "[ERROR] The requested path does not exist", type: "error" },
    { text: "", type: "info" },
    { text: "Possible causes:", type: "info" },
    { text: "  - URL may have been moved or deleted", type: "info" },
    { text: "  - Typo in the address", type: "info" },
    { text: "  - Link may be outdated", type: "info" },
    { text: "", type: "info" },
    { text: "[INFO]  Recommended: Return to home page", type: "success" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gray-950 px-4 py-12">
      {/* 404 ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-7xl md:text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-700 mb-2">
          404
        </h1>
        <p className="text-gray-500 font-mono text-sm">PAGE_NOT_FOUND</p>
      </motion.div>

      {/* メインターミナル */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
          {/* ターミナルヘッダー */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400 font-mono">
                system_log.txt — bash
              </span>
            </div>
            <div className="w-16" /> {/* バランス用スペーサー */}
          </div>

          {/* ターミナル本体 */}
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto">
            <TerminalLog logs={errorLogs} onComplete={() => setShowButtons(true)} />
          </div>
        </div>
      </motion.div>

      {/* アクションボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-green-600 hover:bg-green-700 font-mono"
        >
          <Link href="/">
            <span className="mr-2">$</span> cd /home
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-800 font-mono"
        >
          <Link href="/blog">
            <span className="mr-2">$</span> cat /blog
          </Link>
        </Button>
      </motion.div>

      {/* フッターヒント */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showButtons ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 text-xs font-mono mt-8"
      >
        Press any button to continue...
      </motion.p>
    </div>
  );
}
