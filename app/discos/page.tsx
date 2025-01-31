"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Card, CardContent } from "../../app/components/ui/card";

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

export default function MisProductos() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-4">Mis Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <CardContent>
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-gray-400">{product.description}</p>
                <p className="text-sm text-gray-400">Género: {product.genre}</p>
                <p className="text-sm text-gray-400">Estado: {product.condition}</p>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
