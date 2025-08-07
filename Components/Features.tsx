"use client";

import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/Features.css";

import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Features = () => {
  const newReleases = [
    { id: 1, title: "Vinilo Raro de The Beatles", price: "$150", image: "/images/beatles-vinyl.jpg" },
    { id: 2, title: "Edición Limitada de Pink Floyd", price: "$200", image: "/images/pink-floyd.jpg" },
    { id: 3, title: "CD de Rock Japonés", price: "$80", image: "/images/japanese-rock.jpg" },
    { id: 4, title: "Vinilo de The Rolling Stones", price: "$180", image: "/images/rolling-stones.jpg" },
    { id: 5, title: "Álbum Raro de Nirvana", price: "$250", image: "/images/nirvana.jpg" },
  ];

  const staticItems = [
    { id: 1, title: "Vinilos Exclusivos", image: "/images/exclusive-vinyls.jpg" },
    { id: 2, title: "Éxitos de Rock", image: "/images/top-rock-hits.jpg" },
    { id: 3, title: "Ediciones de Colección", image: "/images/collectors.jpg" },
  ];

  // Detect theme
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const overlayColor = isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
  const textShadow = !isDark ? "2px 2px 0 #000, 0 0 8px #FFD700" : "0 0 8px #FFD700";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="features-container"
      style={{
        padding: "32px 16px",
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        borderRadius: "16px",
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.8)"
          : "0 8px 24px rgba(0,0,0,0.12)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        margin: "40px auto",
        maxWidth: "1100px",
        position: "relative",
      }}
    >
      {/* Static Top Row */}
      <div className="features-static-row" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
        {staticItems.map((item) => (
          <div key={item.id} className="static-item" style={{
            textAlign: "center",
            background: isDark ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.8)",
            borderRadius: "12px",
            boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.08)",
            padding: "18px 10px",
            minWidth: "160px",
            transition: "transform 0.3s",
          }}>
            <img src={item.image} alt={item.title} className="static-image" style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: isDark ? "0 2px 8px #FFD700" : "0 2px 8px #000",
            }} />
            <h3 style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textShadow,
            }}>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Carousel Row with Highlighted Header */}
      <div className="features-carousel-row">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "#FFD700",
            fontWeight: "bold",
            fontSize: "2rem",
            textShadow,
            letterSpacing: "1px",
          }}
        >
          🔥Nuevas Llegadas
        </h2>
        <Slider {...settings}>
          {newReleases.map((release) => (
            <div key={release.id} className="carousel-item" style={{ position: "relative", padding: "10px" }}>
              <Link href={`/albumdetails?id=${release.id}`}>
                <div style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: isDark ? "0 4px 16px #FFD700" : "0 4px 16px #000",
                  transition: "transform 0.3s",
                  background: isDark ? "#222" : "#fff",
                  cursor: "pointer",
                  animation: "slideUp 1s cubic-bezier(.77,0,.175,1)",
                }}>
                  <img
                    src={release.image}
                    alt={release.title}
                    className="carousel-image"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                      background: overlayColor,
                      padding: "12px 18px",
                      borderRadius: "10px",
                      boxShadow: isDark ? "0 2px 8px #FFD700" : "0 2px 8px #000",
                      width: "80%",
                    }}
                  >
                    <h4 style={{
                      margin: 0,
                      color: "#FFD700",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textShadow,
                    }}>{release.title}</h4>
                    <p style={{
                      margin: 0,
                      color: isDark ? "#fff" : "#222",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textShadow: !isDark ? "1px 1px 0 #000" : "none",
                    }}>{release.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .carousel-item:hover img {
            transform: scale(1.05);
          }
          .static-item:hover {
            transform: scale(1.04);
          }
        `}
      </style>
    </div>
  );
};

export default Features;

