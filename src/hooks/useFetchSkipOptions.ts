// src/hooks/useFetchSkipOptions.ts

// Importing React hooks for state management and side effects
import { useEffect, useState } from "react";
// Importing the SkipOption type for type safety
import type { SkipOption } from "../types/SkipOption";

// Custom hook to fetch skip options from the API
export function useFetchSkipOptions() {
  // State variables for skip options, loading status, and error messages
  const [skipOptions, setSkipOptions] = useState<SkipOption[]>([]); // Stores fetched skip options
  const [loading, setLoading] = useState(true); // Indicates whether data is being loaded
  const [error, setError] = useState<string | null>(null); // Stores error messages if fetching fails

  useEffect(() => {
    // API URL for fetching skip options
    // Note: Postcode and area are hardcoded for this redesign
    const apiUrl = `${import.meta.env.VITE_API_URL}?postcode=NR32&area=Lowestoft`;

    console.log("Fetching skip options from:", apiUrl); // Debugging log

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skip options"); // Handle HTTP errors
        return res.json(); // Parse JSON response
      })
      .then((data) => {
        console.log("Fetched skip options:", data); // Debugging log
        setSkipOptions(data); // Update state with fetched data
      })
      .catch((err) => {
        console.error("Error fetching skip options:", err); // Debugging log
        setError("Unable to fetch skip options. Please try again later."); // Set error message
        setSkipOptions([]); // Provide empty fallback data
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch completes
  }, []); // Empty dependency array ensures this effect runs only once

  // Return skip options, loading status, and error message
  return { skipOptions, loading, error };
}