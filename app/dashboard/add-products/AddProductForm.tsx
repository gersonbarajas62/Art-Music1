"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

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

export default function AddProductForm() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    genre: "",
    condition: "",
    image: "",
    type: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !imageFile) {
      alert("Por favor completa los campos obligatorios: Título, Precio e Imagen.");
      return;
    }

    setIsAdding(true);

    try {
      const productData = { ...newProduct, image: imageFile.name }; // Assuming imageFile.name for simplicity
      await addDoc(collection(db, "products"), productData);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        stock: "",
        genre: "",
        condition: "",
        image: "",
        type: "",
      });
      setImageFile(null);
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
        className="bg-gray-800 w-full max-w-5xl p-10 rounded-xl shadow-2xl border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-300">Agregar Nuevo Producto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Título *</label>
            <Input
              type="text"
              placeholder="Título del producto"
              value={newProduct.title || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripción</label>
            <Input
              type="text"
              placeholder="Descripción breve"
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Género</label>
            <Input
              type="text"
              placeholder="Género"
              value={newProduct.genre || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, genre: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Condición</label>
            <Input
              type="text"
              placeholder="Condición"
              value={newProduct.condition || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, condition: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Precio *</label>
            <Input
              type="number"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Stock</label>
            <Input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm text-gray-400 mb-2">Imagen *</label>
          <div
            {...getRootProps()}
            className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-green-500" : "border-gray-600"
            }`}
          >
            <input {...getInputProps()} />
            {imageFile ? (
              <p className="text-gray-300">Archivo seleccionado: {imageFile.name}</p>
            ) : (
              <p className="text-gray-500">Arrastra y suelta tu imagen aquí, o haz clic para seleccionar</p>
            )}
          </div>
        </div>
        <Button
          onClick={addProduct}
          className={`w-full mt-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 ${
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
