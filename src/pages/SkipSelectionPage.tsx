// page : SkipSelectionPage

// Importing React's useState hook for state management
import { useState } from "react";
// Importing custom hook to fetch skip options from the API
import { useFetchSkipOptions } from "../hooks/useFetchSkipOptions";
// Importing components for the page layout
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SkipOptionsGrid from "../components/SkipOptionsGrid";
import StickyActionBar from "../components/StickyActionBar";
// Importing utility function for filtering skip options
import { filterSkipOptions } from "../utils/skipFilter";
// Importing type definition for skip options
import type { SkipOption } from "../types/SkipOption";

export default function SkipSelectionPage() {
  // State variables for managing skip options, selected skip, and filters
  const { skipOptions, loading, error } = useFetchSkipOptions(); // Fetches skip options from the API
  const [selectedId, setSelectedId] = useState<number | null>(null); // Stores the ID of the selected skip
  const [filters, setFilters] = useState<{ maxPrice?: number; minSize?: number; minDurationWeeks?: number }>({}); // Stores filter criteria

  // Find the currently selected skip based on its ID
  const selectedSkip = skipOptions.find((skip: SkipOption) => skip.id === selectedId) || null;
  // Filter skip options based on the current filters
  const filteredSkipOptions = filterSkipOptions(skipOptions, filters);

  // Function to handle changes in filter criteria
  const handleFilterChange = (newFilters: { maxPrice?: number; minSize?: number; minDurationWeeks?: number }) => {
    setFilters(newFilters); // Updates the filters state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header component for page navigation */}
      <Header />
      {/* HeroSection component for filter inputs */}
      <HeroSection onFilterChange={handleFilterChange} skipOptions={skipOptions} />
      <div className="max-w-6xl mx-auto flex flex-col gap-8 py-8 px-4">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <span className="text-blue-400 font-semibold animate-pulse">
              Loading skip options...
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center py-16">
            <span className="text-red-500 font-semibold">{error}</span>
          </div>
        )}

        {/* Render skip options and sticky action bar if no errors and not loading */}
        {!loading && !error && (
          <>
            <SkipOptionsGrid
              skipOptions={filteredSkipOptions} // Pass filtered skip options
              selectedId={selectedId} // Pass selected skip ID
              onSelect={setSelectedId} // Callback to update selected skip ID
            />
            <StickyActionBar selectedSkip={selectedSkip} /> {/* Pass selected skip to sticky action bar */}
          </>
        )}
      </div>
    </div>
  );
}