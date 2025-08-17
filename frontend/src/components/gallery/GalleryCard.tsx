"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TravelGallery } from "@/types/gallery";
import { formatGalleryDate } from "@/lib/imageUtils";

interface GalleryCardProps {
  gallery: TravelGallery;
  onClick: () => void;
  index: number;
}

/**
 * GalleryCard Component
 *
 * Displays a single gallery item with cover image, title, location, and date.
 * Includes hover animations and click handling for lightbox.
 */
export function GalleryCard({ gallery, onClick, index }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={gallery.coverImage.src}
          alt={gallery.coverImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL={gallery.coverImage.blurDataURL}
        />

        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-300">
            View Gallery
          </span>
        </div>

        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-medium text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
            {gallery.images.length} Photos
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {gallery.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{gallery.location}</span>
          <span className="mx-1">•</span>
          <span>{gallery.date.split("-")[0]}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {gallery.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
