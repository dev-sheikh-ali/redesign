// utils/fetchImages.ts

// Importing Supabase client for interacting with the storage bucket
import { supabase } from "./supabaseClient";

// Mapping skip sizes to their corresponding image file names
const imageMapping: Record<number, string> = {
  4: "4-yarder-skip.jpg", // Image for 4-yard skip
  5: "5-yarder-skip.jpg", // Image for 5-yard skip
  6: "6-yarder-skip.jpg", // Image for 6-yard skip
  8: "8-yarder-skip.jpg", // Image for 8-yard skip
  10: "10-yarder-skip.jpg", // Image for 10-yard skip
  12: "12-yarder-skip.jpg", // Image for 12-yard skip
  14: "14-yarder-skip.jpg", // Image for 14-yard skip
  16: "16-yarder-skip.jpg", // Image for 16-yard skip
  20: "20-yarder-skip.jpg", // Image for 20-yard skip
  40: "40-yarder-skip.jpg", // Image for 40-yard skip
};

// Interface defining the structure of image data
interface ImageData {
  name: string; // File name of the image
  url: string; // Public URL of the image
}

/**
 * Fetches all files from the 'redesign' storage bucket and returns an array
 * of objects containing file names and their public URLs.
 */
export async function fetchImages(): Promise<ImageData[]> {
  try {
    const { data: files, error } = await supabase.storage.from("redesign").list("", {
      limit: 100, // Maximum number of files to fetch
      offset: 0, // Starting point for fetching files
    });

    if (error) throw error; // Throw error if fetching fails

    return files.map((file) => {
      const { data } = supabase.storage.from("redesign").getPublicUrl(file.name); // Get public URL for each file
      if (!data?.publicUrl) {
        console.warn(`No public URL for file: ${file.name}`); // Log warning if public URL is missing
      }
      return {
        name: file.name, // File name
        url: data?.publicUrl || "", // Public URL or empty string if unavailable
      };
    });
  } catch (error) {
    console.error("Error fetching images:", error); // Log error if fetching fails
    return []; // Return empty array as fallback
  }
}

/**
 * Returns the public URL of the image for the given skip size.
 * Returns an empty string if no mapping exists or if public URL retrieval fails.
 */
export function getImageUrl(size: number): string {
  const fileName = imageMapping[size]; // Get file name for the given skip size
  if (!fileName) {
    console.warn(`No image mapping found for size: ${size}`); // Log warning if mapping is missing
    return ""; // Return empty string if no mapping exists
  }

  const { data } = supabase.storage.from("redesign").getPublicUrl(fileName); // Get public URL for the file

  if (!data?.publicUrl) {
    console.error(`Failed to get public URL for image: ${fileName}`); // Log error if public URL retrieval fails
    return ""; // Return empty string if public URL retrieval fails
  }

  return data.publicUrl; // Return the public URL of the image
}
