import { NextResponse } from "next/server";

let products: any[] = []; // Temporary in-memory storage (replace with DB later)

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const newProduct = await req.json();
  products.push(newProduct);
  return NextResponse.json({ message: "Product added!", product: newProduct });
}

export async function PUT(req: Request) {
  const { id, updatedProduct } = await req.json();
  products = products.map((p) => (p.id === id ? updatedProduct : p));
  return NextResponse.json({ message: "Product updated!", updatedProduct });
}

export async function DELETE(req: Request) {
  const { deleteId } = await req.json();
  products = products.filter((p) => p.id !== deleteId);
  return NextResponse.json({ message: "Product deleted!" });
}
