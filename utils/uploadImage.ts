import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "./firebase"; // Make sure you export 'app' from firebase.ts

const storage = getStorage(app);

export async function uploadImage(file: File) {
  const storageRef = ref(storage, `products/${uuidv4()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}