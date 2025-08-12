"use client";
import React, { useState } from "react";

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

export default function Dashboard() {
  const [selected, setSelected] = useState("overview");

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
      <main style={{ flex: 1, padding: "40px 5vw" }}>
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
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
              Gestión de Productos
            </h1>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>
              Agrega, edita o elimina vinilos y productos del catálogo.
            </p>
            {/* Aquí irá el CRUD de productos */}
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