"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Masonry from "react-masonry-css";
import type { TravelGallery } from "@/types/gallery";
import { GalleryCard } from "./GalleryCard";
import { GalleryDetailView } from "./GalleryDetailView";

interface GalleryGridProps {
  galleries: TravelGallery[];
}

/**
 * GalleryGrid Component
 *
 * Displays galleries in a responsive masonry layout with lazy loading.
 * Uses Intersection Observer for performance optimization.
 */
export function GalleryGrid({ galleries }: GalleryGridProps) {
  const [selectedGallery, setSelectedGallery] = useState<TravelGallery | null>(
    null,
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [visibleGalleries, setVisibleGalleries] = useState<TravelGallery[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 9;

  // Load more galleries when scrolling
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * ITEMS_PER_PAGE;
    setVisibleGalleries(galleries.slice(startIndex, endIndex));
  }, [galleries, page]);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && visibleGalleries.length < galleries.length) {
        setPage((prev) => prev + 1);
      }
    },
    [visibleGalleries.length, galleries.length],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const handleCardClick = (gallery: TravelGallery) => {
    setSelectedGallery(gallery);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    // Delay clearing selected gallery to allow exit animation
    setTimeout(() => setSelectedGallery(null), 300);
  };

  // Responsive breakpoints for masonry columns
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {visibleGalleries.map((gallery, index) => (
          <div key={gallery.id} className="mb-6">
            <GalleryCard
              gallery={gallery}
              onClick={() => handleCardClick(gallery)}
              index={index}
            />
          </div>
        ))}
      </Masonry>

      {/* Load more trigger */}
      {visibleGalleries.length < galleries.length && (
        <div
          ref={loadMoreRef}
          className="h-20 flex items-center justify-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Tiled Detail View */}
      {selectedGallery && (
        <GalleryDetailView
          gallery={selectedGallery}
          isOpen={lightboxOpen}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
