/*"use client";
import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../utils/supabaseProducts";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<null | any>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch from Firebase
  useEffect(() => {
    setLoading(true);
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = async (product: any) => {
    if (editing) {
      await updateProduct(editing.id, product);
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...product, id: editing.id } : p))
      );
    } else {
      const newProduct = await addProduct(product);
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div style={{ padding: "32px 0" }}>
      <h1 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", marginBottom: 24 }}>
        Gestión de Productos
      </h1>
      <button
        onClick={handleAdd}
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 8,
          padding: "10px 22px",
          fontWeight: "bold",
          fontSize: "1.05rem",
          cursor: "pointer",
          boxShadow: "var(--shadow)",
          marginBottom: 24,
        }}
      >
        Agregar producto
      </button>
      {showForm && (
        <ProductForm
          initialData={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      {loading ? (
        <div style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>Cargando productos...</div>
      ) : (
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}*/