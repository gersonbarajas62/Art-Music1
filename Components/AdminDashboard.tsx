"use client";
import React, { useState } from "react";
import ProductsTable from "./ProductsTable";
import ProductForm from "./ProductForm";

const AdminDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Add delete logic here
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <section
      style={{
        background: "var(--section)",
        color: "var(--text)",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "1200px",
        boxShadow: "var(--shadow)",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "var(--accent)",
          marginBottom: "18px",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        Admin Dashboard
      </h1>
      <ProductForm
        selectedProduct={selectedProduct}
        onClose={handleModalClose}
        // Add other necessary props for add/edit functionality
      />
      <ProductsTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        // Add other necessary props for CRUD operations
      />
    </section>
  );
};

export default AdminDashboard;