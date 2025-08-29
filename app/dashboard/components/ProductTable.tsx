import React from "react";

type Product = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: string;
  price: string;
  stock: number;
  description: string;
  image: string;
  tags?: string[];
  status: "active" | "inactive";
};

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => (
  <div
    style={{
      background: "var(--card)",
      borderRadius: 12,
      boxShadow: "var(--shadow)",
      padding: 24,
      margin: "0 auto",
      maxWidth: 1000,
      overflowX: "auto",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "var(--section)" }}>
          <th style={thStyle}>Portada</th>
          <th style={thStyle}>Título</th>
          <th style={thStyle}>Artista</th>
          <th style={thStyle}>Género</th>
          <th style={thStyle}>Año</th>
          <th style={thStyle}>Precio</th>
          <th style={thStyle}>Stock</th>
          <th style={thStyle}>Estado</th>
          <th style={thStyle}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={9} style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>
              No hay productos registrados.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={tdStyle}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, boxShadow: "var(--shadow)" }}
                  />
                ) : (
                  <span style={{ color: "var(--muted)" }}>Sin imagen</span>
                )}
              </td>
              <td style={tdStyle}>{product.title}</td>
              <td style={tdStyle}>{product.artist}</td>
              <td style={tdStyle}>{product.genre}</td>
              <td style={tdStyle}>{product.year}</td>
              <td style={tdStyle}>{product.price}</td>
              <td style={tdStyle}>{product.stock}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    background: product.status === "active" ? "var(--accent)" : "var(--muted)",
                    color: product.status === "active" ? "var(--bg)" : "var(--text)",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontWeight: "bold",
                    fontSize: "0.92rem",
                  }}
                >
                  {product.status === "active" ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => onEdit(product)}
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 14px",
                    fontWeight: "bold",
                    fontSize: "0.98rem",
                    cursor: "pointer",
                    marginRight: 8,
                    boxShadow: "var(--shadow)",
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
                    padding: "6px 14px",
                    fontWeight: "bold",
                    fontSize: "0.98rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const thStyle: React.CSSProperties = {
  padding: "10px 8px",
  color: "var(--accent)",
  fontWeight: "bold",
  fontSize: "1rem",
  borderBottom: "2px solid var(--border)",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 8px",
  color: "var(--text)",
  fontSize: "0.98rem",
  verticalAlign: "middle",
};

export default ProductTable;