// hooks/useSkipFilters.ts

// Importing React's useState hook for state management
import { useState } from "react";
// Importing the SkipFilter type for type safety
import type { SkipFilter } from "../types/SkipFilter";

// Custom hook to manage skip filters
export function useSkipFilters() {
  // State variable to store the current filters
  const [filters, setFilters] = useState<SkipFilter>({}); // Initializes filters as an empty object

  // Function to update specific filters
  // Accepts a partial object containing the filters to update
  const updateFilter = (partial: Partial<SkipFilter>) => {
    setFilters((prev) => ({ ...prev, ...partial })); // Merges new filters with existing ones
  };

  // Function to reset all filters
  const resetFilters = () => setFilters({}); // Clears all filters by setting them to an empty object

  // Returns the current filters, update function, and reset function
  return {
    filters, // Current filters
    updateFilter, // Function to update filters
    resetFilters, // Function to reset filters
  };
}
