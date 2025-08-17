/**
 * Gallery type definitions for travel photo galleries
 */

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string; // LQIP (Low Quality Image Placeholder) for progressive loading
}

export interface TravelGallery {
  id: string;
  title: string;
  location: string;
  date: string; // ISO 8601 format (YYYY-MM-DD)
  description?: string;
  coverImage: GalleryImage;
  images: GalleryImage[];
  tags: string[];
}

export interface GalleryFilterOptions {
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}
