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
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    throw new Error("No se pudo obtener los productos");
  }
}

export async function addProduct(product: any) {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return { ...product, id: docRef.id };
  } catch (err) {
    throw new Error("No se pudo agregar el producto");
  }
}

export async function updateProduct(id: string, product: any) {
  try {
    await updateDoc(doc(db, PRODUCTS_COLLECTION, id), product);
  } catch (err) {
    throw new Error("No se pudo actualizar el producto");
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (err) {
    throw new Error("No se pudo eliminar el producto");
  }
}