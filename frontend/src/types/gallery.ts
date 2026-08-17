export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Gallery = {
  slug: string;
  title: string;
  location: string;
  /** YYYY-MM-DD */
  date: string;
  description?: string;
  tags: string[];
  cover: GalleryImage;
  images: GalleryImage[];
};
