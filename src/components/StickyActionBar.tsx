// component: StickyActionBar

// Interface defining the structure of a skip option
interface SkipOption {
  id: number; // Unique identifier for the skip
  size: number; // Size of the skip in yards
  hire_period_days: number; // Duration of hire in days
  transport_cost?: number | null; // Optional transport cost
  per_tonne_cost?: number | null; // Optional cost per tonne
  price_before_vat: number; // Base price before VAT
  vat: number; // VAT percentage
  postcode?: string; // Optional postcode for the skip location
  area?: string; // Optional area for the skip location
  allowed_on_road: boolean; // Indicates if the skip is allowed on the road
  allows_heavy_waste: boolean; // Indicates if the skip allows heavy waste
}

// Props interface for StickyActionBar component
interface StickyActionBarProps {
  selectedSkip: SkipOption | null; // Currently selected skip option
  onContinue?: (id: number) => void; // Callback function for the continue action
}

// Utility function to calculate the total price including VAT
const getTotalPrice = (skip: SkipOption): string => {
  const totalPriceBeforeVat =
    skip.price_before_vat +
    (skip.transport_cost ?? 0) +
    (skip.per_tonne_cost ?? 0);

  const priceWithVat = totalPriceBeforeVat * (1 + (skip.vat ?? 0) / 100);

  return priceWithVat.toFixed(2); // Returns the total price as a string
};

export default function StickyActionBar({ selectedSkip, onContinue }: StickyActionBarProps) {
  // Function to handle the continue action
  const handleContinue = () => {
    if (selectedSkip && onContinue) {
      onContinue(selectedSkip.id); // Calls the onContinue callback with the selected skip ID
    } else if (selectedSkip) {
      alert(`Continue with skip ID: ${selectedSkip.id}`); // Fallback action if onContinue is not provided
    }
  };

  // Render fallback UI if no skip is selected
  if (!selectedSkip) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50 transition-all flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center">
          <p className="text-gray-400 text-lg">
            No skip selected. Please choose a skip to proceed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Disclaimer section */}
        <p className="text-sm text-gray-400 sm:flex-1 sm:mr-6 font-bold">
          Imagery and information shown throughout this website may not reflect exact specs. Colors and options may vary.
        </p>

        {/* Skip information section */}
        <div className="sm:flex-1 space-y-1 text-xs"> {/* Reduced font size for skip info */}
          <h2 className="text-base font-semibold">{selectedSkip.size} Yard Skip</h2>
          <p className="text-gray-300">
            Location: {selectedSkip.postcode || "N/A"} {selectedSkip.area ? `- ${selectedSkip.area}` : ""}
          </p>

          <p className="text-gray-300">
            Base Price: £{selectedSkip.price_before_vat.toFixed(2)}
          </p>

          <p className="text-gray-300">
            VAT: £{((selectedSkip.price_before_vat + (selectedSkip.transport_cost ?? 0) + (selectedSkip.per_tonne_cost ?? 0)) * (selectedSkip.vat / 100)).toFixed(2)}
          </p>

          {(selectedSkip.transport_cost ?? 0) > 0 && (
            <p className="text-gray-300">Transport cost: £{selectedSkip.transport_cost?.toFixed(2)}</p>
          )}

          {(selectedSkip.per_tonne_cost ?? 0) > 0 && (
            <p className="text-gray-300">Cost per tonne: £{selectedSkip.per_tonne_cost?.toFixed(2)}</p>
          )}

          <p className="text-blue-400 font-bold text-lg"> {/* Adjusted total price font size */}
            Total: £{getTotalPrice(selectedSkip)}
          </p>
        </div>

        {/* Action buttons section */}
        <div className="flex gap-4 sm:flex-none sm:justify-end">
          <button
            className="px-6 py-2 rounded bg-gray-700 text-gray-300 font-semibold hover:bg-gray-600 transition"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="px-8 py-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            onClick={handleContinue}
            aria-label="Continue"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
