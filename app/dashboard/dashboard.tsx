"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

interface Product {
  title: string;
  description: string;
  genre: string;
  condition: string;
  images: string[];
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
    images: [],
    price: 0,
    stock: 1,
    type: "Vinyl",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const imageUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setNewProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...imageUrls],
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.images?.length) {
      setModalMessage("Falta algo en el formulario. Por favor completa todos los campos requeridos.");
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
        images: [],
        price: 0,
        stock: 1,
        type: "Vinyl",
      });
      setModalMessage("¡Otro disco añadido a la colección!");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setModalMessage("Lo sentimos, no se guardó este disco.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 w-full max-w-4xl p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Agregar Nuevo Producto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label className="block text-sm text-gray-400 mb-1">Precio *</label>
            <Input
              type="number"
              placeholder="Precio"
              min="0"
              value={newProduct.price || 0}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Stock</label>
            <Input
              type="number"
              placeholder="Cantidad en stock"
              min="1"
              value={newProduct.stock || 1}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div
          {...getRootProps()}
          className={`border-2 mt-6 p-4 rounded-md text-center ${
            isDragActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>¡Suelta tus imágenes aquí!</p>
          ) : (
            <p>
              Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar.
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          {newProduct.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-20 h-20 rounded-md object-cover"
            />
          ))}
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
      {modalMessage && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <p>{modalMessage}</p>
            <Button
              onClick={() => setModalMessage(null)}
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Cerrar
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
