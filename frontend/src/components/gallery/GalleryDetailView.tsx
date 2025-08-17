"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { TravelGallery } from "@/types/gallery";
import { formatGalleryDate } from "@/lib/imageUtils";
import { useEffect } from "react";

interface GalleryDetailViewProps {
  gallery: TravelGallery;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * GalleryDetailView Component
 *
 * A full-screen modal that displays all images in a gallery as a dense tiled grid.
 * Replaces the traditional carousel lightbox for a more "geeky" / modern feel.
 */
export function GalleryDetailView({
  gallery,
  isOpen,
  onClose,
}: GalleryDetailViewProps) {
  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {gallery.title}
              </h2>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{gallery.location}</span>
                <span>•</span>
                <span>{gallery.date}</span>
                <span>•</span>
                <span>{gallery.images.length} Photos</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
              {gallery.images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square overflow-hidden group rounded-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                  />

                  {/* Minimal Info on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-xs font-medium truncate">
                      {image.alt || `Photo ${index + 1}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
