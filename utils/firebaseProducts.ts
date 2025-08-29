import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const PRODUCTS_COLLECTION = "products";

export async function getProducts() {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addProduct(product: any) {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
  return { ...product, id: docRef.id };
}

export async function updateProduct(id: string, product: any) {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), product);
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}