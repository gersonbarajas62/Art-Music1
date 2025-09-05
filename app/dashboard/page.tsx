"use client";
import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import {
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  getProductsWithImages,
  addProductWithImages,
  updateProductWithImages,
  deleteProductWithImages,
} from "../../utils/supabaseProducts";

const menuOptions = [
  { key: "overview", label: "Resumen", icon: "📊" },
  { key: "products", label: "Productos", icon: "💿" },
  { key: "orders", label: "Órdenes", icon: "📦" },
  { key: "customers", label: "Clientes", icon: "🧑‍🤝‍🧑" },
  { key: "messages", label: "Mensajes", icon: "✉️" },
  { key: "newsletter", label: "Newsletter", icon: "📧" },
  { key: "about", label: "Sobre Nosotros", icon: "🎸" },
  { key: "settings", label: "Configuración", icon: "⚙️" },
];

// Import the Product type/interface, not the component
// Define Product type here if not exported from ProductForm
export interface Product {
  id: string;
  title: string;
  artist: string;
  price: number;
  oldPrice?: number;
  image: string;
  tipo: string;
  genero: string;
  estado: string;
  condicion: string;
  featured: boolean;
  newArrival: boolean;
  beatlesShowcase: boolean;
  beatlesFeatured?: boolean;
  badge?: string;
  quantity: number;
  description: string;
  createdAt?: any;
  tags?: string[];
  status: "active" | "inactive";
  year?: string;
  numerodeCatalogo?: string; // Added field
}

export default function Dashboard() {
  const [selected, setSelected] = useState("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Use CRUD helpers for Firestore operations
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsData = await getProductsWithImages();
        setProducts(productsData);
        setLoading(false);
      } catch (err: any) {
        setError("Error al cargar productos");
        setLoading(false);
      }
    }
    if (selected === "products") fetchProducts();
  }, [selected, showForm]);

  const handleSubmitProduct = async (product: any, imageUrls: string[]) => {
    setLoading(true);
    try {
      if (editingProduct && editingProduct.id) {
        await updateProductWithImages(editingProduct.id, product, imageUrls);
      } else {
        const newProduct = await addProductWithImages(product, imageUrls);
        if (newProduct) {
          setProducts((prev) => [...prev, newProduct]);
        }
      }
      setShowForm(false);
      setEditingProduct(null);
      setLoading(false);
    } catch (err: any) {
      setError("Error al guardar producto");
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await deleteProductWithImages(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setLoading(false);
    } catch (err: any) {
      setError("Error al eliminar producto");
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    // Pass all product fields to initialData for editing
    setEditingProduct({ ...product });
    setShowForm(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        flexDirection: "row",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          minWidth: 180,
          background: "var(--section)",
          borderRight: "1px solid var(--border)",
          display: selected === "products" && showForm ? "none" : "flex", // Hide sidebar when form is open on products
          flexDirection: "column",
          padding: "32px 0 0 0",
          minHeight: "100vh",
          boxShadow: "var(--shadow)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "var(--accent)",
              letterSpacing: 1,
            }}
          >
            Artmusic Admin
          </span>
        </div>
        <nav>
          {menuOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "14px 32px",
                background: selected === opt.key ? "var(--card)" : "none",
                color: selected === opt.key ? "var(--accent)" : "var(--text)",
                border: "none",
                borderLeft: selected === opt.key ? "4px solid var(--accent)" : "4px solid transparent",
                fontWeight: selected === opt.key ? "bold" : 500,
                fontSize: "1.08rem",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                outline: "none",
                marginBottom: 2,
              }}
            >
              <span style={{ fontSize: "1.3rem", marginRight: 14 }}>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px 5vw",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          minWidth: 0,
        }}
      >
        {/* Responsive header */}
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 24,
            alignItems: "flex-start",
          }}
        >
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--accent)",
            marginBottom: 0,
            wordBreak: "break-word",
          }}>
            {selected === "overview" && "Resumen de la tienda"}
            {selected === "products" && "Catálogo de Productos"}
            {selected === "orders" && "Órdenes y envíos"}
            {selected === "customers" && "Clientes"}
            {selected === "messages" && "Mensajes y Contacto"}
            {selected === "newsletter" && "Suscriptores Newsletter"}
            {selected === "about" && "Sobre Nosotros"}
            {selected === "settings" && "Configuración"}
          </h1>
          <p style={{ color: "var(--muted)", marginBottom: 0, fontSize: "1.08rem" }}>
            {selected === "overview" && "Aquí verás estadísticas generales, ventas recientes y actividad."}
            {selected === "products" && "Administra el catálogo, nuevos lanzamientos, destacados y más."}
            {selected === "orders" && "Administra pedidos, estados de envío y ventas."}
            {selected === "customers" && "Consulta y gestiona la información de tus clientes."}
            {selected === "messages" && "Lee y responde mensajes de contacto recibidos."}
            {selected === "newsletter" && "Gestiona los correos suscritos al boletín."}
            {selected === "about" && "Edita la información de la sección \"Sobre el dueño\"."}
            {selected === "settings" && "Ajusta la configuración general de la tienda."}
          </p>
        </header>

        {/* Main Section */}
        <section
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            background: "var(--card)",
            borderRadius: 16,
            boxShadow: "0 8px 32px var(--shadow)",
            padding: "24px 12px",
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {selected === "products" && (
            <div style={{ position: "relative" }}>
              {!showForm && (
                <button
                  onClick={handleAddProduct}
                  style={{
                    position: "fixed",
                    right: "5vw",
                    bottom: "40px",
                    zIndex: 100,
                    background: "var(--accent)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: 50,
                    padding: "16px 32px",
                    fontWeight: "bold",
                    fontSize: "1.15rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow)",
                    transition: "background 0.2s",
                  }}
                  className="add-product-btn"
                >
                  + Agregar producto
                </button>
              )}
              {/* Modal for ProductForm */}
              {showForm && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "540px",
                    height: "100vh",
                    background: "var(--card)",
                    boxShadow: "var(--shadow)",
                    zIndex: 99,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    borderLeft: "2px solid var(--border)",
                    padding: "48px 32px 32px 32px",
                    overflowY: "auto",
                    transition: "right 0.35s cubic-bezier(.77,0,.175,1)",
                  }}
                  tabIndex={-1}
                  onClick={() => { setShowForm(false); setEditingProduct(null); }}
                  onKeyDown={e => {
                    if (e.key === "Escape") {
                      setShowForm(false);
                      setEditingProduct(null);
                    }
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "480px",
                      background: "none",
                      borderRadius: 0,
                      boxShadow: "none",
                      padding: 0,
                      position: "relative",
                      margin: "0 auto",
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Close button top right */}
                    <button
                      aria-label="Cerrar"
                      onClick={() => { setShowForm(false); setEditingProduct(null); }}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "none",
                        border: "none",
                        fontSize: "1.7rem",
                        color: "var(--accent)",
                        cursor: "pointer",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        transition: "background 0.2s",
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "var(--section)")}
                      onMouseOut={e => (e.currentTarget.style.background = "none")}
                    >
                      ×
                    </button>
                    <ProductForm
                      initialData={
                        editingProduct
                          ? {
                              ...editingProduct,
                              status: editingProduct.status ? "true" : "false",
                            }
                          : undefined
                      }
                      onSubmit={handleSubmitProduct}
                      onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                      }}
                    />
                  </div>
                </div>
              )}
              <div style={{ marginTop: 24 }}>
                {loading ? (
                  <div style={{ color: "var(--muted)", marginTop: 24, textAlign: "center" }}>Cargando productos...</div>
                ) : error ? (
                  <div style={{ color: "#b80000", marginTop: 24, textAlign: "center" }}>{error}</div>
                ) : (
                  <ProductTable
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                )}
              </div>
            </div>
          )}
          {/* ...other sections unchanged... */}
        </section>
        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: 900px) {
              main {
                padding: 24px 2vw !important;
              }
              section {
                padding: 18px 4px !important;
                border-radius: 10px !important;
              }
              .add-product-btn {
                font-size: 1rem !important;
                padding: 12px 22px !important;
              }
              .product-form-modal {
                width: 100vw !important;
                max-width: 100vw !important;
                padding: 24px 2vw !important;
                position: fixed !important;
                right: 0 !important;
                left: auto !important;
                top: 0 !important;
                height: 100vh !important;
                overflow-y: auto !important;
              }
            }
            @media (max-width: 600px) {
              aside {
                display: none !important;
              }
              main {
                padding: 8px 2vw !important;
              }
              section {
                padding: 4px 2px !important;
                border-radius: 0 !important;
                box-shadow: none !important;
              }
              .add-product-btn {
                font-size: 0.98rem !important;
                padding: 10px 16px !important;
                border-radius: 30px !important;
                right: 12px !important;
                bottom: 18px !important;
              }
              .product-form-modal {
                width: 100vw !important;
                max-width: 100vw !important;
                padding: 18px 2vw !important;
                position: fixed !important;
                right: 0 !important;
                left: auto !important;
                top: 0 !important;
                height: 100vh !important;
                overflow-y: auto !important;
              }
            }
          `}
        </style>
      </main>
    </div>
  );
}