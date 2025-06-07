// src/components/SkipOptionsGrid.tsx
// component: SkipOptionsGrid

// Importing SkipOptionCard component to render individual skip options
import SkipOptionCard from "./SkipOptionCard";

// SkipOptionsGrid component
// Props:
// - skipOptions: Array of skip options to display
// - selectedId: ID of the currently selected skip
// - onSelect: Callback function to handle skip selection
export default function SkipOptionsGrid({ skipOptions, selectedId, onSelect }: any) {
  return (
    <>
      {skipOptions.length === 0 ? (
        <div className="text-center text-gray-400 italic">No skip options available. Please adjust your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapping skip options to individual SkipOptionCard components */}
          {skipOptions.map((skip: any) => (
            <SkipOptionCard key={skip.id} skip={skip} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </>
  );
}