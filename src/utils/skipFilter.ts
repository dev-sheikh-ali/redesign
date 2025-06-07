// Importing type definitions for skip options and filters
import type { SkipOption } from "../types/SkipOption";
import type { SkipFilter } from "../types/SkipFilter";

/**
 * Filters skip options based on the provided criteria.
 * @param skips - Array of skip options to filter.
 * @param filters - Filtering criteria including price, size, and duration.
 * @returns Filtered array of skip options.
 */
export function filterSkipOptions(
  skips: SkipOption[],
  filters: SkipFilter
): SkipOption[] {
  const filteredSkips = skips.filter((skip) => {
    // Calculate total price including VAT
    const totalPriceBeforeVat =
      skip.price_before_vat +
      (skip.transport_cost ?? 0) +
      (skip.per_tonne_cost ?? 0);

    const priceWithVat = totalPriceBeforeVat * (1 + (skip.vat ?? 0) / 100);

    // Check if skip matches the minimum price filter
    const matchesMinPrice =
      filters.minPrice === undefined || priceWithVat >= filters.minPrice;
    // Check if skip matches the maximum price filter
    const matchesMaxPrice =
      filters.maxPrice === undefined || priceWithVat <= filters.maxPrice;
    // Check if skip matches the minimum size filter
    const matchesSize =
      filters.minSize === undefined || skip.size >= filters.minSize;
    // Check if skip matches the minimum duration filter
    const matchesDuration =
      filters.minDurationWeeks === undefined || skip.hire_period_days >= filters.minDurationWeeks * 7;

    // Return true if skip matches all filters
    return (
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesSize &&
      matchesDuration
    );
  });

  // Return an empty array if no skips match the filters
  if (filteredSkips.length === 0) {
    return [];
  }

  return filteredSkips; // Return the filtered skips
}

/**
 * Utility to calculate the price range of skips including VAT.
 * @param skips - Array of skip options.
 * @returns Object with min and max prices including VAT.
 */
export function getPriceRange(skips: SkipOption[]) {
  // Map skip options to their prices including VAT
  const prices = skips.map(
    (skip) => skip.price_before_vat * (1 + (skip.vat ?? 0) / 100)
  );
  return {
    min: Math.min(...prices), // Minimum price
    max: Math.max(...prices), // Maximum price
  };
}