import { supabase } from "./supabaseClient";

// Make sure the bucket name matches what you created in Supabase Storage dashboard
const BUCKET_NAME = "images"; // <-- Change this to match your actual bucket name

export async function uploadImage(file: File): Promise<string> {
  // Use the correct folder path as in your Supabase storage: image/productimage/
  const ext = file.name.split(".").pop();
  const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/\s/g, "_");
  const fileName = `productimage/${Date.now()}-${baseName}.${ext}`; // <-- match folder

  // Upload to the correct folder inside the bucket
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);
  if (error) {
    if (error.message && error.message.includes("Bucket not found")) {
      throw new Error(`Bucket "${BUCKET_NAME}" not found in Supabase Storage. Please create it in the Supabase dashboard.`);
    }
    throw error;
  }
  // Always use getPublicUrl for the final image URL
  const { publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName).data;
  return publicUrl;
}
