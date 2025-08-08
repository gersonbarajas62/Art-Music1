// import FeatureSection from "./FeatureSection";

"use client";
import React from "react";

const FeatureSection = ({
  title,
  items,
  isDark,
}: {
  title: string;
  items: { id: number; title: string; image: string; price?: string }[];
  isDark: boolean;
}) => {
  const textShadow = !isDark
    ? "2px 2px 0 #000, 0 0 8px #FFD700"
    : "0 0 8px #FFD700";
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3
        style={{
          color: "#FFD700",
          fontWeight: "bold",
          fontSize: "1.3rem",
          textShadow,
          marginBottom: "1.2rem",
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              textAlign: "center",
              background: isDark
                ? "rgba(30,30,30,0.8)"
                : "rgba(255,255,255,0.8)",
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(0,0,0,0.08)",
              padding: "18px 10px",
              minWidth: "160px",
              transition: "transform 0.3s",
              width: "180px",
            }}
            className="static-item"
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
              className="static-image"
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
            {item.price && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;