// components/SkipOptionCard.tsx

// Importing utility functions for image fetching and skip selection logic
import { getImageUrl } from "../utils/fetchImages"; // Fetches the public URL of skip images
import { getSkipSelectionInfo } from "../utils/skipSelection"; // Provides warnings and selection status for skips
import type { Warning } from "../utils/skipSelection"; // Type definition for warnings
import type { SkipOption } from "../types/SkipOption"; // Type definition for skip options

// Props interface for SkipOptionCard component
interface SkipOptionCardProps {
  skip: SkipOption; // Skip option data
  selectedId: number | null; // ID of the currently selected skip
  onSelect: (id: number | null) => void; // Callback function for selecting a skip
}

// Mapping warning severity to CSS classes for styling
const warningColors: Record<Warning["severity"], string> = {
  red: "bg-red-600 text-white", // Styling for red warnings
  yellow: "bg-yellow-400 text-black", // Styling for yellow warnings
};

export default function SkipOptionCard({ skip, selectedId, onSelect }: SkipOptionCardProps) {
  const isSelected = selectedId === skip.id; // Check if the current skip is selected
  const { warnings, isSelectable } = getSkipSelectionInfo(skip); // Get warnings and selection status

  // Calculate total price including VAT
  const totalPriceBeforeVat =
    skip.price_before_vat +
    (skip.transport_cost ?? 0) +
    (skip.per_tonne_cost ?? 0);

  const priceWithVat = totalPriceBeforeVat * (1 + (skip.vat ?? 0) / 100);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border-2 p-4 bg-gray-800 shadow-md transition-transform transform hover:scale-105
        ${isSelected ? "border-blue-600 ring-2 ring-blue-300" : "border-gray-700"}
        ${isSelectable ? "cursor-pointer hover:border-blue-500" : "cursor-not-allowed opacity-70"}
      `}
      onClick={() => {
        if (isSelectable) {
          onSelect(isSelected ? null : skip.id); // Toggle selection
        }
      }}
      title={isSelectable ? "" : "This skip option cannot be selected due to red warnings."}
    >
      {/* Size badge */}
      <div className="absolute top-2 left-2 z-10 bg-purple-700 text-white text-sm font-bold px-2 py-1 rounded">
        {skip.size} Yards
      </div>

      {/* Warning icon and tooltip */}
      {warnings.length > 0 && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 group">
          <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center text-sm font-semibold cursor-default">
            ⚠️
          </div>

          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-sm text-white rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 whitespace-nowrap">
            {warnings.map((w, i) => (
              <div key={i} className={`px-2 py-1 rounded mb-1 last:mb-0 ${warningColors[w.severity]}`}>
                {w.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={getImageUrl(skip.size)}
        alt={`${skip.size} Yard Skip`}
        className="w-full h-auto rounded mb-4"
      />

      {/* Details */}
      <h2 className="text-xl font-bold mb-2">{skip.size} Yard Skip</h2>
      <p className="text-gray-400 mb-2">{skip.hire_period_days} day hire period</p>
      <p className="text-blue-500 font-bold text-lg mb-4">
        £{priceWithVat.toFixed(2)}
      </p>

      {/* Select button */}
      <button
        type="button"
        disabled={!isSelectable}
        className={`w-full py-2 rounded-lg font-semibold transition
          ${isSelected
            ? "bg-purple-700 text-white cursor-default"
            : isSelectable
            ? "bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }
        `}
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click event
          if (isSelectable) onSelect(isSelected ? null : skip.id); // Toggle selection
        }}
        aria-disabled={!isSelectable}
        aria-label={
          isSelectable ? (isSelected ? "Selected" : "Select this skip") : "Skip option not selectable due to warnings"
        }
      >
        {isSelected ? "Selected" : "Select This Skip"}
      </button>
    </div>
  );
}
