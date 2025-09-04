import React from "react";

type Product = {
  id: string;
  title: string;
  artist: string;
  price: number;
  oldPrice?: number;
  createdAt?: any;
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
      margin: "32px auto 48px auto",
      maxWidth: 1100,
      overflowX: "auto",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "var(--section)" }}>
          <th style={thStyle}>Título</th>
          <th style={thStyle}>Artista</th>
          <th style={thStyle}>Precio</th>
          <th style={thStyle}>Precio anterior</th>
          <th style={thStyle}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>
              No hay productos registrados.
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr
              key={product.id}
              style={{
                borderBottom: "1px solid var(--border)",
                transition: "background 0.2s",
              }}
              className="product-row"
            >
              <td style={tdStyle}>{product.title}</td>
              <td style={tdStyle}>{product.artist}</td>
              <td style={tdStyle}>${product.price}</td>
              <td style={tdStyle}>{product.oldPrice ? `$${product.oldPrice}` : "-"}</td>
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
    <style>
      {`
        .product-row:hover {
          background: var(--section);
        }
      `}
    </style>
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