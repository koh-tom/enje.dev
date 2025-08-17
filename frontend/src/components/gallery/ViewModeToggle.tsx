"use client";

import { motion } from "framer-motion";

interface ViewModeToggleProps {
  mode: "masonry" | "grid";
  onModeChange: (mode: "masonry" | "grid") => void;
}

/**
 * ViewModeToggle Component
 *
 * Toggle between masonry and grid layout modes
 */
export function ViewModeToggle({ mode, onModeChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onModeChange("masonry")}
        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          mode === "masonry"
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
        }`}
      >
        {mode === "masonry" && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        )}
        <span className="relative z-10">Masonry</span>
      </button>

      <button
        onClick={() => onModeChange("grid")}
        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          mode === "grid"
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
        }`}
      >
        {mode === "grid" && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        )}
        <span className="relative z-10">Grid</span>
      </button>
    </div>
  );
}
