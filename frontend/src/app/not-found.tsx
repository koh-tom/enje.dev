"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * ターミナルのコマンド履歴と出力を管理
 */
type TerminalLine = {
  id: string;
  text: string;
  type: "input" | "output" | "error" | "success" | "info";
};

/**
 * 7セグメントディスプレイ風の数字表示
 */
function SevenSegmentDigit({ digit, color = "cyan" }: { digit: string; color?: string }) {
  const segments: Record<string, boolean[]> = {
    "0": [true, true, true, true, true, true, false],
    "1": [false, true, true, false, false, false, false],
    "2": [true, true, false, true, true, false, true],
    "3": [true, true, true, true, false, false, true],
    "4": [false, true, true, false, false, true, true],
    "5": [true, false, true, true, false, true, true],
    "6": [true, false, true, true, true, true, true],
    "7": [true, true, true, false, false, false, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
  };

  const activeSegments = segments[digit] || segments["0"];

  const colorClasses = {
    cyan: { active: "bg-cyan-400 shadow-cyan-400/30", dim: "bg-cyan-900/30" },
    red: { active: "bg-red-400 shadow-red-400/50", dim: "bg-red-900/30" },
    green: { active: "bg-green-400 shadow-green-400/50", dim: "bg-green-900/30" },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan;
  const getSegmentClass = (isActive: boolean) =>
    isActive ? `${colors.active} shadow-lg` : colors.dim;

  return (
    <div className="relative w-12 h-20 md:w-16 md:h-28">
      <div className={`absolute top-0 left-1 right-1 h-1.5 md:h-2 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[0])}`} />
      <div className={`absolute top-1 right-0 w-1.5 md:w-2 h-8 md:h-11 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[1])}`} />
      <div className={`absolute bottom-1 right-0 w-1.5 md:w-2 h-8 md:h-11 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[2])}`} />
      <div className={`absolute bottom-0 left-1 right-1 h-1.5 md:h-2 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[3])}`} />
      <div className={`absolute bottom-1 left-0 w-1.5 md:w-2 h-8 md:h-11 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[4])}`} />
      <div className={`absolute top-1 left-0 w-1.5 md:w-2 h-8 md:h-11 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[5])}`} />
      <div className={`absolute top-1/2 -translate-y-1/2 left-1 right-1 h-1.5 md:h-2 rounded-full transition-all duration-300 ${getSegmentClass(activeSegments[6])}`} />
    </div>
  );
}

function SevenSegmentDisplay({ text, color = "cyan" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {text.split("").map((char, index) => (
        <SevenSegmentDigit key={`seg-${index}`} digit={char} color={color} />
      ))}
    </div>
  );
}

/**
 * インタラクティブターミナル
 */
function InteractiveTerminal() {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // 初期メッセージをタイプライター効果で表示
  const initialMessages = [
    { text: "$ curl -X GET /requested-page", type: "input" as const },
    { text: "[ERROR] HTTP 404: Resource not found", type: "error" as const },
    { text: "[INFO]  The requested path does not exist", type: "info" as const },
    { text: "", type: "info" as const },
    { text: "Type 'help' for available commands", type: "success" as const },
  ];

  useEffect(() => {
    let lineIndex = 0;
    const addLine = () => {
      if (lineIndex < initialMessages.length) {
        const msg = initialMessages[lineIndex];
        setLines(prev => [...prev, { id: `init-${lineIndex}`, text: msg.text, type: msg.type }]);
        lineIndex++;
        setTimeout(addLine, 150);
      } else {
        setIsTyping(false);
        inputRef.current?.focus();
      }
    };
    addLine();
  }, []);

  // 自動スクロール
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // 利用可能なルート
  const routes: Record<string, string> = {
    "/": "/",
    "/home": "/",
    "~": "/",
    "/blog": "/blog",
    "/about": "/about",
    "/portfolio": "/portfolio",
    "/gallery": "/gallery",
    "/contact": "/contact",
  };

  // コマンド処理
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { id: `cmd-${Date.now()}`, text: `$ ${cmd}`, type: "input" },
    ];

    if (!trimmedCmd) {
      setLines(prev => [...prev, ...newLines]);
      return;
    }

    // cd コマンド
    if (trimmedCmd.startsWith("cd ")) {
      const path = trimmedCmd.slice(3).trim();
      const route = routes[path];
      if (route) {
        newLines.push({ id: `out-${Date.now()}`, text: `Navigating to ${path}...`, type: "success" });
        setLines(prev => [...prev, ...newLines]);
        setTimeout(() => router.push(route), 500);
        return;
      }
      newLines.push({ id: `out-${Date.now()}`, text: `bash: cd: ${path}: No such directory`, type: "error" });
    }
    // ls コマンド
    else if (trimmedCmd === "ls" || trimmedCmd === "ls -la") {
      newLines.push({ id: `out-${Date.now()}-1`, text: "drwxr-xr-x  /home      (Homepage)", type: "info" });
      newLines.push({ id: `out-${Date.now()}-2`, text: "drwxr-xr-x  /blog      (Blog posts)", type: "info" });
      newLines.push({ id: `out-${Date.now()}-3`, text: "drwxr-xr-x  /about     (About me)", type: "info" });
      newLines.push({ id: `out-${Date.now()}-4`, text: "drwxr-xr-x  /portfolio (Projects)", type: "info" });
      newLines.push({ id: `out-${Date.now()}-5`, text: "drwxr-xr-x  /gallery   (Photo gallery)", type: "info" });
      newLines.push({ id: `out-${Date.now()}-6`, text: "drwxr-xr-x  /contact   (Contact form)", type: "info" });
    }
    // help コマンド
    else if (trimmedCmd === "help" || trimmedCmd === "--help" || trimmedCmd === "-h") {
      newLines.push({ id: `out-${Date.now()}-1`, text: "Available commands:", type: "success" });
      newLines.push({ id: `out-${Date.now()}-2`, text: "  cd <path>  - Navigate to a page", type: "info" });
      newLines.push({ id: `out-${Date.now()}-3`, text: "  ls         - List available pages", type: "info" });
      newLines.push({ id: `out-${Date.now()}-4`, text: "  clear      - Clear terminal", type: "info" });
      newLines.push({ id: `out-${Date.now()}-5`, text: "  help       - Show this help", type: "info" });
      newLines.push({ id: `out-${Date.now()}-6`, text: "", type: "info" });
      newLines.push({ id: `out-${Date.now()}-7`, text: "Example: cd /home", type: "info" });
    }
    // clear コマンド
    else if (trimmedCmd === "clear") {
      setLines([]);
      return;
    }
    // whoami コマンド
    else if (trimmedCmd === "whoami") {
      newLines.push({ id: `out-${Date.now()}`, text: "visitor", type: "info" });
    }
    // pwd コマンド
    else if (trimmedCmd === "pwd") {
      newLines.push({ id: `out-${Date.now()}`, text: "/404", type: "info" });
    }
    // cat コマンド
    else if (trimmedCmd.startsWith("cat ")) {
      const path = trimmedCmd.slice(4).trim();
      const route = routes[path];
      if (route) {
        newLines.push({ id: `out-${Date.now()}`, text: `Opening ${path}...`, type: "success" });
        setLines(prev => [...prev, ...newLines]);
        setTimeout(() => router.push(route), 500);
        return;
      }
      newLines.push({ id: `out-${Date.now()}`, text: `cat: ${path}: No such file or directory`, type: "error" });
    }
    // 未知のコマンド
    else {
      newLines.push({ id: `out-${Date.now()}`, text: `bash: ${trimmedCmd.split(" ")[0]}: command not found`, type: "error" });
    }

    setLines(prev => [...prev, ...newLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case "error": return "text-red-400";
      case "success": return "text-green-400";
      case "input": return "text-gray-100";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl shadow-black/50 w-full max-w-2xl">
      {/* ターミナルヘッダー */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400 font-mono">
            visitor@enje.dev: ~/404
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* ターミナル本体 */}
      <div
        ref={terminalRef}
        className="p-4 font-mono text-sm leading-relaxed h-[300px] overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
        onKeyDown={() => inputRef.current?.focus()}
      >
        {/* 履歴表示 */}
        {lines.map((line) => (
          <div key={line.id} className={getTextColor(line.type)}>
            {line.text || "\u00A0"}
          </div>
        ))}

        {/* 入力行 */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-gray-100 outline-none caret-green-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse text-green-400">▌</span>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * 404 Not Found ページ - インタラクティブターミナル
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gray-950 px-4 py-12">
      {/* 404 ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <SevenSegmentDisplay text="404" color="cyan" />
        </div>
        <p className="text-gray-500 font-mono text-sm">PAGE_NOT_FOUND</p>
      </motion.div>

      {/* インタラクティブターミナル */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <InteractiveTerminal />
      </motion.div>

      {/* ヒント */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-gray-600 text-xs font-mono mt-6"
      >
        Try typing: help, ls, cd /home
      </motion.p>

      {/* または区切り線 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex items-center gap-4 mt-8"
      >
        <div className="h-px w-16 bg-gray-700" />
        <span className="text-gray-500 text-xs font-mono">or</span>
        <div className="h-px w-16 bg-gray-700" />
      </motion.div>

      {/* アクションボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
      >
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm transition-colors"
        >
          <span className="mr-2">←</span> Back to Home
        </a>
        <a
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 font-mono text-sm transition-colors"
        >
          View Blog
        </a>
      </motion.div>
    </div>
  );
}
