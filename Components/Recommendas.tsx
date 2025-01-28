/*"use client";

import { useState, useEffect } from "react";

const Recommendations = ({ userActivity }) => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Simulate fetching recommendations when user activity occurs
    if (userActivity) {
      setShowRecommendations(true);
      // Mock recommendation data
      setRecommendations([
        { id: 1, title: "Led Zeppelin IV", artist: "Led Zeppelin", price: "$34.99" },
        { id: 2, title: "The Wall", artist: "Pink Floyd", price: "$39.99" },
        { id: 3, title: "Paranoid", artist: "Black Sabbath", price: "$29.99" },
      ]);
    }
  }, [userActivity]);

  if (!showRecommendations) return null; // Don't display section if no activity

  return (
    <section
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "40px 20px",
        borderRadius: "8px",
        marginTop: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#6c63ff" }}>
        Recommended for You
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {recommendations.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#2a2a2a",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "18px", color: "#fff", marginBottom: "10px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#bbb", marginBottom: "10px" }}>
              {item.artist}
            </p>
            <p style={{ fontSize: "16px", color: "#6c63ff", fontWeight: "bold" }}>
              {item.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;*/
