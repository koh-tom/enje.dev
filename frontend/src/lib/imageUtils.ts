/**
 * Image utility functions for gallery
 */

/**
 * Generate a placeholder blur data URL for progressive image loading
 * This is a simple base64-encoded 1x1 pixel image
 */
export function generateBlurDataURL(color = "#e5e7eb"): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get optimized image URL for gallery images
 * @param path - Image path relative to /public
 * @param size - Optional size parameter for responsive images
 */
export function getImageUrl(
  path: string,
  size?: "thumbnail" | "medium" | "full",
): string {
  // For local images in /public directory
  if (path.startsWith("/")) {
    return path;
  }

  // Add size suffix if needed
  if (size && size !== "full") {
    const ext = path.split(".").pop();
    const pathWithoutExt = path.substring(0, path.lastIndexOf("."));
    return `${pathWithoutExt}-${size}.${ext}`;
  }

  return path;
}

/**
 * Calculate responsive image sizes for different breakpoints
 */
export function getResponsiveSizes(columns: {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}): string {
  return [
    `(max-width: 640px) ${Math.floor(100 / columns.mobile)}vw`,
    `(max-width: 768px) ${Math.floor(100 / columns.tablet)}vw`,
    `(max-width: 1024px) ${Math.floor(100 / columns.desktop)}vw`,
    `${Math.floor(100 / columns.wide)}vw`,
  ].join(", ");
}

/**
 * Format date for display
 */
export function formatGalleryDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
