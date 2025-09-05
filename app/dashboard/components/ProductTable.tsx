import React, { useState } from "react";

type Product = {
  id: string;
  title: string;
  artist: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
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
};

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  // Filter products by search (title, artist, tags)
  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.title.toLowerCase().includes(term) ||
      product.artist.toLowerCase().includes(term) ||
      (product.tags && product.tags.join(",").toLowerCase().includes(term))
    );
  });

  return (
    <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
      {/* Search bar top right */}
      <div style={{
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        maxWidth: "100%",
        padding: "18px 0 24px 0", // Added top/bottom padding
        marginBottom: 18, // Added margin below search bar
        zIndex: 2,
        background: "var(--card)",
        borderRadius: 12,
        boxShadow: "0 2px 8px var(--shadow)",
      }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, artista o etiqueta..."
          style={{
            width: "100%",
            maxWidth: 340,
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--section)",
            color: "var(--text)",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 2px 8px var(--shadow)",
          }}
        />
      </div>
      {/* Grid view */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: 32,
          marginTop: 0, // Remove extra marginTop since search bar is now spaced
        }}
      >
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)", padding: 24 }}>
            No hay productos registrados.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "var(--card)",
                borderRadius: 12,
                boxShadow: "var(--shadow)",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid var(--border)",
                position: "relative",
                minHeight: 220,
                transition: "box-shadow 0.2s, border 0.2s, transform 0.2s",
              }}
              className="product-card"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 8,
                    boxShadow: "var(--shadow)",
                    marginBottom: 10,
                    background: "var(--section)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 8,
                    background: "var(--section)",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                  }}
                >
                  Sin imagen
                </div>
              )}
              <div style={{ fontWeight: "bold", color: "var(--accent)", fontSize: "1.05rem", marginBottom: 2, textAlign: "center" }}>
                {product.title}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.97rem", marginBottom: 2, textAlign: "center" }}>
                {product.artist}
              </div>
              <div style={{ fontSize: "1.02rem", fontWeight: "bold", color: "var(--accent)", marginBottom: 8, textAlign: "center" }}>
                ${product.price}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: "auto", justifyContent: "center" }}>
                <button
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontWeight: "bold",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow)",
                    minWidth: 0,
                  }}
                >
                  Ver detalles
                </button>
                <button
                  onClick={() => onEdit(product)}
                  style={{
                    background: "var(--card)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontWeight: "bold",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow)",
                    minWidth: 0,
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  style={{
                    background: "var(--muted)",
                    color: "var(--text)",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontWeight: "bold",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow)",
                    minWidth: 0,
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal for details */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100vw",
            maxWidth: 540,
            height: "100vh",
            background: "var(--card)",
            boxShadow: "var(--shadow)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            borderLeft: "2px solid var(--border)",
            padding: "0",
            overflowY: "auto",
          }}
          tabIndex={-1}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "none",
              borderRadius: 0,
              boxShadow: "none",
              padding: "48px 32px 32px 32px",
              position: "relative",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar"
              onClick={() => setSelectedProduct(null)}
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
            {selectedProduct.image ? (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{
                  width: "100%",
                  maxWidth: 320,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                  boxShadow: "var(--shadow)",
                  marginBottom: 16,
                  background: "var(--section)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  maxWidth: 320,
                  height: 180,
                  borderRadius: 8,
                  background: "var(--section)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Sin imagen
              </div>
            )}
            <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.3rem", marginBottom: 8 }}>
              {selectedProduct.title}
            </h2>
            <div style={{ color: "var(--muted)", fontSize: "1.08rem", marginBottom: 8 }}>
              {selectedProduct.artist}
            </div>
            <div style={{ fontSize: "1.08rem", marginBottom: 8 }}>
              <b>Tipo:</b> {selectedProduct.tipo}
            </div>
            <div style={{ fontSize: "1.08rem", marginBottom: 8 }}>
              <b>Género:</b> {selectedProduct.genero}
            </div>
            <div style={{ fontSize: "1.13rem", fontWeight: "bold", color: "var(--accent)", marginBottom: 8 }}>
              <b>Precio:</b> ${selectedProduct.price}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Badge:</b> <span style={{ background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)", color: "#222", borderRadius: "8px", padding: "2px 10px", fontWeight: "bold" }}>{selectedProduct.badge || "-"}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Stock:</b> {selectedProduct.quantity}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Año:</b> {selectedProduct.year || "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Descripción:</b> {selectedProduct.description || "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Etiquetas:</b> {selectedProduct.tags && selectedProduct.tags.length > 0 ? selectedProduct.tags.join(", ") : "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Destacado:</b> {selectedProduct.featured ? "✔️" : "—"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Nuevo:</b> {selectedProduct.newArrival ? "🆕" : "—"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Beatles:</b> {selectedProduct.beatlesShowcase ? "🎸" : "—"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Estado:</b> {selectedProduct.estado || "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Condición:</b> {selectedProduct.condicion || "-"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Imágenes:</b>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {selectedProduct.images && Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0
                  ? selectedProduct.images
                      .filter(img => !!img)
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={img} // Use the full public URL returned by Supabase
                          alt={`img${idx + 1}`}
                          style={{
                            width: 32,
                            height: 32,
                            objectFit: "cover",
                            borderRadius: 4,
                            marginRight: 2,
                            background: "var(--section)",
                            border: "1px solid var(--border)",
                            boxShadow: "var(--shadow)",
                          }}
                          onError={e => {
                            if (e.currentTarget.src !== "https://via.placeholder.com/32?text=No+Img") {
                              e.currentTarget.src = "https://via.placeholder.com/32?text=No+Img";
                            }
                          }}
                        />
                      ))
                  : <span style={{ color: "var(--muted)" }}>-</span>
                }
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Status:</b>{" "}
              <span
                style={{
                  background: selectedProduct.status === "active" ? "var(--accent)" : "var(--muted)",
                  color: selectedProduct.status === "active" ? "var(--bg)" : "var(--text)",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontWeight: "bold",
                  fontSize: "0.92rem",
                }}
              >
                {selectedProduct.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <button
                onClick={() => onEdit(selectedProduct)}
                style={{
                  background: "var(--accent)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: "bold",
                  fontSize: "1.01rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow)",
                  transition: "background 0.2s",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(selectedProduct.id)}
                style={{
                  background: "var(--muted)",
                  color: "var(--text)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: "bold",
                  fontSize: "1.01rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow)",
                  transition: "background 0.2s",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          .product-card:hover {
            box-shadow: 0 8px 32px var(--shadow), 0 2px 12px var(--shadow);
            border: 1.5px solid var(--accent);
            transform: scale(1.04);
          }
          @media (max-width: 900px) {
            .product-card {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            .product-card {
              min-width: 95vw;
              max-width: 98vw;
              padding: 10px 4px 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductTable;