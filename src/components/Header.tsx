// components/Header.tsx

// Importing icons from Heroicons library for breadcrumb navigation
import {
  MapPinIcon, // Icon for Postcode step
  TrashIcon, // Icon for Waste Type step
  ClipboardDocumentListIcon, // Icon for Select Skip step
  DocumentMagnifyingGlassIcon, // Icon for Permit Check step
  CalendarDaysIcon, // Icon for Choose Date step
  CreditCardIcon, // Icon for Payment step
} from "@heroicons/react/24/outline";

// Defining the steps for breadcrumb navigation
const steps = [
  { label: "Postcode", icon: MapPinIcon },
  { label: "Waste Type", icon: TrashIcon },
  { label: "Select Skip", icon: ClipboardDocumentListIcon },
  { label: "Permit Check", icon: DocumentMagnifyingGlassIcon },
  { label: "Choose Date", icon: CalendarDaysIcon },
  { label: "Payment", icon: CreditCardIcon },
];

// Current step in the breadcrumb navigation
const currentStep = "Select Skip";

export default function Header() {
  return (
    <header className="bg-gradient-to-tr from-gray-950 to-gray-900 text-white pb-8 shadow-md">
      {/* Navigation bar containing breadcrumb steps */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <ol className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 gap-y-2 sm:gap-y-3 text-xs sm:text-sm">
          {steps.map((step, idx) => {
            const Icon = step.icon; // Icon for the current step
            const isCurrent = step.label === currentStep; // Check if the step is the current one
            const isCompleted = steps.findIndex(s => s.label === currentStep) > idx; // Check if the step is completed

            return (
              <li key={step.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full transition-all
                    ${
                      isCurrent
                        ? "bg-purple-600 text-white shadow" // Styling for the current step
                        : isCompleted
                        ? "bg-gray-800 text-gray-300" // Styling for completed steps
                        : "bg-gray-800 text-gray-500" // Styling for upcoming steps
                    }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="whitespace-nowrap font-medium">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" // Arrow between steps
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}
