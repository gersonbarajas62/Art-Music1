import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
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
  const { id } = req.query;
  const productRef = doc(db, "products", id as string);

  if (req.method === "PUT") {
    try {
      const updatedFields = req.body;
      await updateDoc(productRef, updatedFields);
      const updatedProduct = (await getDoc(productRef)).data();
      res.status(200).json({ updatedProduct });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await deleteDoc(productRef);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
