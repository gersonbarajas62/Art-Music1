"use clinet";

import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// Update a product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const productRef = doc(db, "products", params.id);
    await updateDoc(productRef, body);
    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// Delete a product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const productRef = doc(db, "products", params.id);
    await deleteDoc(productRef);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
