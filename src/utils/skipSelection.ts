// utils/skipSelection.ts

// Importing type definition for skip options
import type { SkipOption } from "../types/SkipOption";

// Type definition for warnings associated with skip selection
export type Warning = {
  text: string; // Warning message
  severity: "red" | "yellow"; // Severity level of the warning
};

// Type definition for skip selection information
export type SkipSelectionInfo = {
  warnings: Warning[]; // Array of warnings for the skip
  isSelectable: boolean; // Indicates if the skip can be selected
  hasRedWarnings: boolean; // Indicates if the skip has red warnings
};

/**
 * Determines the selection information for a given skip option.
 * @param skip - The skip option to evaluate.
 * @returns Object containing warnings, selection status, and red warning flag.
 */
export function getSkipSelectionInfo(skip: SkipOption): SkipSelectionInfo {
  const warnings: Warning[] = []; // Initialize an empty array for warnings

  // Add a red warning if the skip does not allow heavy waste
  if (!skip.allows_heavy_waste) {
    warnings.push({ text: "Not suitable for heavy waste", severity: "red" });
  }

  // Add a yellow warning if the skip is not allowed on the road
  if (!skip.allowed_on_road) {
    warnings.push({ text: "Not allowed on the road", severity: "yellow" });
  }

  // Check if there are any red warnings
  const hasRedWarnings = warnings.some(w => w.severity === "red");
  // Determine if the skip is selectable (no red warnings)
  const isSelectable = !hasRedWarnings;

  // Return the selection information for the skip
  return { warnings, isSelectable, hasRedWarnings };
}
