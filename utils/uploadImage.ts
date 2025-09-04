/*import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";

// Enhance error handling for uploadImage
export async function uploadImage(file: File): Promise<string> {
  const storage = getStorage(app);
  const fileName = `products/${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const storageRef = ref(storage, fileName);
  try {
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    // Log and rethrow for UI feedback
    console.error("Firebase Storage upload error:", error);
    if (error.code === "storage/retry-limit-exceeded") {
      throw new Error("No se pudo subir la imagen. Intenta de nuevo más tarde.");
    }
    throw error;
  }
}*/