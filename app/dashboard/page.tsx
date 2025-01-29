"use client";

import { useState, useEffect } from "react";

// Define the Product type based on your Firebase data structure
interface Product {
  id: string; // Firebase document ID
  title: string;
  description: string;
  genre: string;
  condition: string;
  image: string;
  price: number;
  stock: number;
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
  });

  // Fetch products from Firebase
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, []);

  // Add a new product
  const addProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    setProducts((prev) => [...prev, data.product]);
    setNewProduct({
      title: "",
      description: "",
      genre: "",
      condition: "",
      image: "",
      price: 0,
      stock: 0,
    });
  };

  // Update a product
  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    const data = await res.json();
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? data.updatedProduct : product))
    );
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>
      <main className="p-8">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-gray-800 rounded-lg shadow space-y-2"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-gray-400">{product.description}</p>
              <p className="text-sm text-gray-400">Genre: {product.genre}</p>
              <p className="text-sm text-gray-400">
                Condition: {product.condition}
              </p>
              <p className="text-sm text-gray-400">Stock: {product.stock}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateProduct(product.id, { title: "Updated Title" })
                  }
                  className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Add New Product</h2>
        <div className="space-y-4 bg-gray-800 p-4 rounded-lg shadow">
          <input
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <input
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Genre"
            value={newProduct.genre}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, genre: e.target.value }))
            }
          />
          <input
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Condition"
            value={newProduct.condition}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, condition: e.target.value }))
            }
          />
          <input
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          <input
            type="number"
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                price: parseFloat(e.target.value) || 0,
              }))
            }
          />
          <input
            type="number"
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                stock: parseInt(e.target.value) || 0,
              }))
            }
          />
          <button
            onClick={addProduct}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </div>
      </main>
    </div>
  );
}
