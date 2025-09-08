"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * スクロールプログレスバー
 *
 * ページ上部に固定表示され、スクロール位置に応じて進捗を表示
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // スムーズなアニメーションのためにspring を使用
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-600 origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}
