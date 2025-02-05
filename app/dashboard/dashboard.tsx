"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { motion } from "framer-motion";

interface Product {
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
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    genre: "",
    condition: "",
    image: "",
    price: 0,
    stock: 1,
    type: "Vinyl",
  });
  const [isAdding, setIsAdding] = useState(false);

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("Por favor completa los campos obligatorios: Título, Precio e Imagen.");
      return;
    }

    setIsAdding(true);

    try {
      await addDoc(collection(db, "products"), newProduct);
      setNewProduct({
        title: "",
        description: "",
        genre: "",
        condition: "",
        image: "",
        price: 0,
        stock: 1,
        type: "Vinyl",
      });
      alert("Producto agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Hubo un error al agregar el producto.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 w-full max-w-3xl p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Agregar Nuevo Producto</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Título *</label>
            <Input
              type="text"
              placeholder="Título del producto"
              value={newProduct.title || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Descripción</label>
            <Input
              type="text"
              placeholder="Descripción breve"
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Género</label>
            <Input
              type="text"
              placeholder="Género musical"
              value={newProduct.genre || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, genre: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Condición</label>
            <Input
              type="text"
              placeholder="Condición del producto"
              value={newProduct.condition || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, condition: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Imagen *</label>
            <Input
              type="text"
              placeholder="URL de la imagen"
              value={newProduct.image || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Precio *</label>
            <input
              type="number"
              placeholder="Precio"
              min="0"
              value={newProduct.price || 0}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Stock</label>
            <input
              type="number"
              placeholder="Cantidad en stock"
              min="1"
              value={newProduct.stock || 1}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: Number(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tipo</label>
            <Input
              type="text"
              placeholder="Tipo (e.g., Vinyl, CD)"
              value={newProduct.type || "Vinyl"}
              onChange={(e) =>
                setNewProduct({ ...newProduct, type: e.target.value })
              }
            />
          </div>
        </div>
        <Button
          onClick={addProduct}
          className={`w-full mt-6 py-3 ${
            isAdding ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isAdding}
        >
          {isAdding ? "Agregando..." : "Agregar Producto"}
        </Button>
      </motion.div>
    </div>
  );
}
