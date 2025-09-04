import { supabase } from "./supabaseClient";

// Make sure the bucket name matches what you created in Supabase Storage dashboard
const BUCKET_NAME = "images"; // Change this if your bucket is named differently

export async function uploadImage(file: File): Promise<string> {
  const fileName = `products/${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);
  if (error) {
    // Helpful error message for missing bucket
    if (error.message && error.message.includes("Bucket not found")) {
      throw new Error(`Bucket "${BUCKET_NAME}" not found in Supabase Storage. Please create it in the Supabase dashboard.`);
    }
    throw error;
  }
  const { publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName).data;
  return publicUrl;
}
