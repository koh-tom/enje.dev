"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 初回訪問時のみローディングを表示（セッション内では再表示しない）
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        // ローディング時間（1.5秒後にフェードアウト開始）
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasVisited", "true");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* ロゴ/テキスト */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-8xl md:text-8xl font-bold text-white tracking-tight"
                        >
                            enje.dev
                        </motion.div>

                        {/* プログレスバー */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "450px" }}
                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                            className="h-0.5 bg-gradient-to-r from-blue-500 via-gray-500 to-white rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
