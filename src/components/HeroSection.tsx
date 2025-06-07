// components/HeroSection.tsx

// Importing React hooks for state management and side effects
import { useState, useEffect } from "react";
// Importing the SkipOption type for type safety
import type { SkipOption } from "../types/SkipOption";

// Props interface for HeroSection component
interface HeroSectionProps {
  onFilterChange: (filters: {
    minPrice?: number; // Minimum price filter
    maxPrice?: number; // Maximum price filter
    minSize?: number; // Minimum yard size filter
    minDurationWeeks?: number; // Minimum hire duration filter
  }) => void;
  skipOptions: SkipOption[]; // Array of skip options to display
}

export default function HeroSection({ onFilterChange, skipOptions }: HeroSectionProps) {
  // State variables for filter inputs
  const [minPrice, setMinPrice] = useState<number | "">(""); // Minimum price input
  const [maxPrice, setMaxPrice] = useState<number | "">(""); // Maximum price input
  const [minSize, setMinSize] = useState<number>(0); // Minimum yard size input
  const [minDurationWeeks, setMinDurationWeeks] = useState<number>(0); // Minimum hire duration input

  // Effect hook to update filters whenever inputs change
  useEffect(() => {
    onFilterChange({
      minPrice: minPrice === "" ? undefined : minPrice, // Pass undefined if input is empty
      maxPrice: maxPrice === "" ? undefined : maxPrice, // Pass undefined if input is empty
      minSize, // Pass selected yard size
      minDurationWeeks, // Pass selected hire duration
    });
  }, [minPrice, maxPrice, minSize, minDurationWeeks]);

  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      {/* Section title */}
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 drop-shadow-md">
        Select Your Skip Size
      </h1>
      <p className="text-gray-400 mb-8">
        Choose the skip size that best fits your needs. All prices include VAT.
      </p>

      {/* Filters and button in one row */}
      <div className="flex flex-wrap items-end gap-4 justify-center">
        {/* Min Price Filter */}
        <div className="flex flex-col w-36">
          <label htmlFor="minPrice" className="text-sm font-semibold text-gray-300 mb-1">
            Min Price (£)
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="No min"
            className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Max Price Filter */}
        <div className="flex flex-col w-36">
          <label htmlFor="maxPrice" className="text-sm font-semibold text-gray-300 mb-1">
            Max Price (£)
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="No max"
            className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Min Yard Size Filter */}
        <div className="flex flex-col w-36">
          <label htmlFor="minSize" className="text-sm font-semibold text-gray-300 mb-1">
            Min Yard Size
          </label>
          <select
            id="minSize"
            value={minSize}
            onChange={(e) => setMinSize(Number(e.target.value))}
            className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value={0}>All</option>
            {[4, 5, 6, 8, 10, 12, 14, 16, 20, 40].map((size) => (
              <option key={size} value={size}>
                {size} yards
              </option>
            ))}
          </select>
        </div>

        {/* Min Duration Filter */}
        <div className="flex flex-col w-36">
          <label htmlFor="minDurationWeeks" className="text-sm font-semibold text-gray-300 mb-1">
            Min Duration (weeks)
          </label>
          <select
            id="minDurationWeeks"
            value={minDurationWeeks}
            onChange={(e) => setMinDurationWeeks(Number(e.target.value))}
            className="p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value={0}>All</option>
            {[1, 2, 3, 4].map((w) => (
              <option key={w} value={w}>
                {w} week{w > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fallback message if no skips match the filters */}
      {Array.isArray(skipOptions) && skipOptions.length === 0 && (
        <p className="mt-6 text-gray-400 italic">
          No skips found matching your criteria. Please adjust the filters.
        </p>
      )}
    </section>
  );
}
