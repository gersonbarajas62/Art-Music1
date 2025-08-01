"use clinet";

import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Get all products
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const docRef = await addDoc(collection(db, "products"), body);
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
