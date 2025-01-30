"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface Product {
  id: string;
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
      alert("Title, Price, and Image URL are required.");
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
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, updatedFields);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...updatedFields } : product))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">No products found. Add a new product below.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-gray-400">{product.description}</p>
                <p className="text-sm text-gray-400">Genre: {product.genre}</p>
                <p className="text-sm text-gray-400">Condition: {product.condition}</p>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateProduct(product.id, { title: "Updated Title" })}
                    className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold mt-8">Add New Product</h2>
        <div className="bg-gray-800 p-6 rounded-lg mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Genre"
              value={newProduct.genre}
              onChange={(e) => setNewProduct({ ...newProduct, genre: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Condition"
              value={newProduct.condition}
              onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={addProduct}
            className="w-full mt-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
          >
            Add Product
          </button>
        </div>
      </main>
    </div>
  );
}
