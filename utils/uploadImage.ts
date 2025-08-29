import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";

export async function uploadImage(file: File): Promise<string> {
  const storage = getStorage(app);
  const fileName = `products/${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}