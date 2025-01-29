import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const productsRef = collection(db, "products");

  if (req.method === "GET") {
    try {
      const snapshot = await getDocs(productsRef);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      const newProduct = req.body;
      const docRef = await addDoc(productsRef, newProduct);
      const createdProduct = { id: docRef.id, ...newProduct };
      res.status(201).json({ product: createdProduct });
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
