"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsWithImages } from "../../../utils/supabaseProducts";

export default function GenrePage() {
  const { genre } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getProductsWithImages().then(all =>
      setProducts(all.filter(p => p.genero?.toLowerCase() === String(genre).replace(/-/g, " ").toLowerCase()))
    );
  }, [genre]);
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.artist.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section style={{ maxWidth: 1200, margin: "40px auto", padding: 32 }}>
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", marginBottom: 24 }}>
        Género: {genre}
      </h2>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar..."
        style={{
          width: "100%",
          maxWidth: 340,
          padding: "12px 18px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
          fontSize: "1.08rem",
          outline: "none",
          boxShadow: "0 2px 8px var(--shadow)",
          marginBottom: 32,
        }}
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "32px",
      }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            background: "var(--card)",
            borderRadius: "14px",
            boxShadow: "var(--shadow)",
            padding: "28px 18px 22px 18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            minHeight: 320,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            width: 260,
            margin: "0 auto",
            gap: 8,
            border: "1px solid var(--border)",
          }}>
            {item.images && item.images.length > 0 ? (
              <img src={item.images[0]} alt={item.title} style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1.5px solid var(--border)",
                background: "var(--card)",
                boxShadow: "var(--shadow)",
                marginBottom: "4px",
              }} />
            ) : (
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
                background: "var(--section)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted)",
                fontWeight: "bold",
                fontSize: "1.1rem",
                marginBottom: "16px",
              }}>
                Sin imagen
              </div>
            )}
            <div style={{
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bold",
              color: "var(--accent)",
              fontSize: "1.1rem",
              textShadow: "0 2px 8px var(--bg)",
            }}>
              {item.title}
            </div>
            <div style={{
              color: "var(--muted)",
              fontSize: "1rem",
              marginBottom: "8px",
              fontWeight: 500,
            }}>
              {item.artist}
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--accent)", marginBottom: 8 }}>
              ${item.price}
            </div>
            <button
              style={{
                marginTop: "auto",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                textTransform: "uppercase",
                boxShadow: "var(--shadow)",
                letterSpacing: "1px",
                transition: "background-color 0.3s, transform 0.3s",
                width: "100%",
              }}
              onClick={() => window.location.href = `/albumdetails/${item.id}`}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
