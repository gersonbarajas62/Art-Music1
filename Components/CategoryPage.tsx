"use client";
import React from "react";

const mockData: Record<string, any[]> = {
  "vinilos-exclusivos": [
    { id: 1, title: "Vinilo Raro de The Beatles", image: "/images/beatles-vinyl.jpg", price: "$150" },
    { id: 2, title: "Vinilo de Queen", image: "/images/queen.jpg", price: "$180" },
  ],
  "exitos-rock": [
    { id: 1, title: "Éxitos de Pink Floyd", image: "/images/pink-floyd.jpg", price: "$200" },
    { id: 2, title: "Éxitos de The Rolling Stones", image: "/images/rolling-stones.jpg", price: "$180" },
  ],
  "ediciones-coleccion": [
    { id: 1, title: "Edición Limitada de Metallica", image: "/images/metallica.jpg", price: "$300" },
    { id: 2, title: "Colección de Michael Jackson", image: "/images/mj.jpg", price: "$350" },
  ],
};

const CategoryPage = ({ category }: { category: string }) => {
  const items = mockData[category] || [];
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const textShadow = !isDark
    ? "2px 2px 0 #000, 0 0 8px #FFD700"
    : "0 0 8px #FFD700";

  return (
    <section
      style={{
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        padding: "48px 0px",
        borderRadius: "18px",
        margin: "40px auto",
        maxWidth: "1100px",
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.8)"
          : "0 8px 24px rgba(0,0,0,0.13)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#FFD700",
          marginBottom: "32px",
          textAlign: "center",
          textShadow,
        }}
      >
        {category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: isDark ? "#232323" : "#fff",
              borderRadius: "14px",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.45)"
                : "0 2px 8px rgba(0,0,0,0.08)",
              padding: "24px 18px",
              minWidth: "180px",
              maxWidth: "220px",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: isDark
                  ? "0 2px 8px #FFD700"
                  : "0 2px 8px #000",
              }}
            />
            <div
              style={{
                color: "#FFD700",
                fontWeight: "bold",
                fontSize: "1.05rem",
                textShadow,
                marginBottom: "0.3rem",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                color: isDark ? "#fff" : "#222",
                fontWeight: "bold",
                fontSize: "1rem",
                textShadow: !isDark ? "1px 1px 0 #000" : "none",
              }}
            >
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
