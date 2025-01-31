"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Button } from "../../app/components/ui/button";
import { Card, CardContent } from "../../app/components/ui/card";
import { Input } from "../../app/components/ui/input";

interface Product {
  id: string;
  title: string;
  description: string;
  genre: string;
  condition: string;
  image: string;
  price: number;
  stock: number;
  type: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    genre: "",
    condition: "",
    image: "",
    price: 0,
    stock: 0,
    type: "Vinyl",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("Título, Precio e Imagen son obligatorios.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      const addedProduct: Product = { id: docRef.id, ...newProduct } as Product;
      setProducts((prev) => [...prev, addedProduct]);
      setNewProduct({
        title: "",
        description: "",
        genre: "",
        condition: "",
        image: "",
        price: 0,
        stock: 0,
        type: "Vinyl",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        <Button
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => (window.location.href = "/discos")}
        >
          Mis Productos
        </Button>

        <h2 className="text-2xl font-bold mt-6">Agregar Nuevo Producto</h2>
        <div className="bg-gray-800 p-6 rounded-lg mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(newProduct).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm text-gray-400 mb-1">{key.toUpperCase()}</label>
                <Input
                  type={typeof value === "number" ? "number" : "text"}
                  placeholder={key}
                  value={value as string | number}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <Button
            onClick={addProduct}
            className="w-full mt-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
          >
            Agregar Producto
          </Button>
        </div>
      </main>
    </div>
  );
}
