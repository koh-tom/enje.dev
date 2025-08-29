"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const text = "enje.dev";
  const radius = 140;
  const duration = 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // 文字を近くに配置（円周の一部だけを使う）
  const spacing = 18; // 文字間の角度（度）
  const characters = text.split("").map((char, index) => {
    const angle = (index * spacing * Math.PI) / 180;
    return {
      char,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative w-[450px] h-[450px] gradient-to-r from-blue-500 to-gray-500">
            {/* 蛇のように連なって回転する文字グループ */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "center center",
              }}
            >
              {characters.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${item.x}px)`,
                    top: `calc(50% + ${item.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span
                    className="text-5xl font-bold"
                    style={{
                      color: "#ffffff",
                      textShadow:
                        "0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.4)",
                    }}
                  >
                    {item.char}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* 中心の装飾 */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-800 shadow-lg shadow-blue-800/50" />
            </motion.div>

            {/* 軌道 */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
