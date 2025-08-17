"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { galleryData, filterGalleries } from "@/data/galleryData";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FilterBar } from "@/components/gallery/FilterBar";
import { ViewModeToggle } from "@/components/gallery/ViewModeToggle";

/**
 * Gallery Page - Geek Visualisation Style
 */

export default function GalleryPage() {
  const [filters, setFilters] = useState<{
    location?: string;
    tags?: string[];
  }>({});
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  const filteredGalleries = filterGalleries(galleryData, filters);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-gray-800"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                旅のギャラリー / Travel Gallery
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                旅先での思い出や瞬間を記録したコレクションです。
              </p>
            </div>

            <div className="flex items-center gap-4">
              <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterBar onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            {filteredGalleries.length > 0 ? (
              <GalleryGrid galleries={filteredGalleries} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  写真が見つかりませんでした
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  フィルター設定を変更して再検索してみてください。
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
