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
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">
        Mis Discos
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-dark-gray rounded-lg h-64 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-custom-yellow/50"
            >
              <Card>
              <div
                className="w-full h-40 bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: `url(${
                    product.image || "/placeholder-image.png"
                  })`,
                }}
              ></div>
              <CardContent>
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {product.description}
                </p>
                <p className="text-sm text-gray-400">Género: {product.genre}</p>
                <p className="text-sm text-gray-400">Estado: {product.condition}</p>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
