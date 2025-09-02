"use client";
import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../utils/firebaseProducts";

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
  badge?: string;
  quantity: number;
  description: string;
  createdAt?: any;
  tags?: string[];
  status: "active" | "inactive";
  year?: string;
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
        const data = await getProducts();
        // Ensure each product has all required Product fields
        const productsData: Product[] = data.map((item: any) => ({
          id: item.id,
          title: item.title ?? "",
          artist: item.artist ?? "",
          price: item.price ?? 0,
          oldPrice: item.oldPrice,
          image: item.image ?? "",
          tipo: item.tipo ?? "",
          genero: item.genero ?? "",
          estado: item.estado ?? "",
          condicion: item.condicion ?? "",
          featured: item.featured ?? false,
          newArrival: item.newArrival ?? false,
          beatlesShowcase: item.beatlesShowcase ?? false,
          badge: item.badge,
          quantity: item.quantity ?? 0,
          description: item.description ?? "",
          createdAt: item.createdAt,
          tags: item.tags ?? [],
          status: item.status ?? "active",
          year: item.year,
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (err: any) {
        setError("Error al cargar productos");
        setLoading(false);
      }
    }
    if (selected === "products") fetchProducts();
  }, [selected, showForm]);

  const handleSubmitProduct = async (product: Product) => {
    setLoading(true);
    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct(editingProduct.id, {
          ...product,
          updatedAt: Timestamp.now(),
        });
      } else {
        const newProduct = await addProduct({
          ...product,
          createdAt: Timestamp.now(),
        });
        setProducts((prev) => [...prev, newProduct]);
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
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setLoading(false);
    } catch (err: any) {
      setError("Error al eliminar producto");
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
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
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "var(--section)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          padding: "32px 0 0 0",
          minHeight: "100vh",
          boxShadow: "var(--shadow)",
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
      <main style={{ flex: 1, padding: "40px 5vw", position: "relative" }}>
        {selected === "overview" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Resumen de la tienda
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Aquí verás estadísticas generales, ventas recientes y actividad.
            </p>
            {/* Aquí puedes agregar gráficos y KPIs */}
          </div>
        )}
        {selected === "products" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)", marginBottom: 8 }}>
              Catálogo de Productos
            </h1>
            <p style={{ color: "var(--muted)", marginBottom: 32 }}>
              Administra el catálogo, nuevos lanzamientos, destacados y más.
            </p>
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
            >
              + Agregar producto
            </button>
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
                // Add tabIndex and onKeyDown for ESC key close
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
                    initialData={editingProduct ?? undefined}
                    onSubmit={handleSubmitProduct}
                    onCancel={() => { setShowForm(false); setEditingProduct(null); }}
                  />
                </div>
              </div>
            )}
            <div style={{ marginTop: 24 }}>
              {loading ? (
                <div style={{ color: "var(--muted)", marginTop: 24 }}>Cargando productos...</div>
              ) : error ? (
                <div style={{ color: "#b80000", marginTop: 24 }}>{error}</div>
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
        {selected === "orders" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Órdenes y envíos
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Administra pedidos, estados de envío y ventas.
            </p>
            {/* Aquí irá la tabla de órdenes */}
          </div>
        )}
        {selected === "customers" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Clientes
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Consulta y gestiona la información de tus clientes.
            </p>
            {/* Aquí irá la lista de clientes */}
          </div>
        )}
        {selected === "messages" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Mensajes y Contacto
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Lee y responde mensajes de contacto recibidos.
            </p>
            {/* Aquí irá la bandeja de mensajes */}
          </div>
        )}
        {selected === "newsletter" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Suscriptores Newsletter
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Gestiona los correos suscritos al boletín.
            </p>
            {/* Aquí irá la lista de suscriptores */}
          </div>
        )}
        {selected === "about" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Sobre Nosotros
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Edita la información de la sección "Sobre el dueño".
            </p>
            {/* Aquí irá el editor de About */}
          </div>
        )}
        {selected === "settings" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Configuración
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Ajusta la configuración general de la tienda.
            </p>
            {/* Aquí irán las opciones de configuración */}
          </div>
        )}
      </main>
    </div>
  );
}