"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUniqueLocations, getUniqueTags } from "@/data/galleryData";

interface FilterBarProps {
  onFilterChange: (filters: { location?: string; tags?: string[] }) => void;
}

/**
 * FilterBar Component
 *
 * Provides filtering options for gallery by location and tags.
 * Includes animated filter chips and clear functionality.
 */
export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const locations = getUniqueLocations();
  const tags = getUniqueTags();

  const handleLocationChange = (location: string) => {
    const newLocation = selectedLocation === location ? undefined : location;
    setSelectedLocation(newLocation);
    onFilterChange({ location: newLocation, tags: selectedTags });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({ location: selectedLocation, tags: newTags });
  };

  const handleClearAll = () => {
    setSelectedLocation(undefined);
    setSelectedTags([]);
    onFilterChange({});
  };

  const hasActiveFilters = selectedLocation || selectedTags.length > 0;

  return (
    <div className="space-y-8">
      {/* Location Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Location
        </h3>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationChange(location)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 border ${
                selectedLocation === location
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1.5 text-xs transition-all duration-200 rounded-md border ${
                selectedTags.includes(tag)
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={handleClearAll}
            className="w-full py-2.5 text-sm text-center text-gray-500 hover:text-red-500 transition-colors border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Clear All Filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
