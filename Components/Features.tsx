"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/Features.css";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Features = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const newReleases = [
    { id: 1, title: "Vinilo Raro de The Beatles", price: "$150", image: "/images/beatles-vinyl.jpg" },
    { id: 2, title: "Edición Limitada de Pink Floyd", price: "$200", image: "/images/pink-floyd.jpg" },
    { id: 3, title: "CD de Rock Japonés", price: "$80", image: "/images/japanese-rock.jpg" },
    { id: 4, title: "Vinilo de The Rolling Stones", price: "$180", image: "/images/rolling-stones.jpg" },
    { id: 5, title: "Álbum Raro de Nirvana", price: "$250", image: "/images/nirvana.jpg" },
  ];

  // Use CSS variables for palette
  const overlayColor = "var(--section)";
  const accent = "var(--accent)";
  const text = "var(--text)";
  const muted = "var(--muted)";
  const card = "var(--card)";
  const shadow = "var(--shadow)";
  const bg = "var(--bg)";

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

  const categorySections = [
    {
      title: "Vinilos Exclusivos",
      image: "/images/beatles-vinyl.jpg",
      href: "/categories/vinilos-exclusivos",
    },
    {
      title: "Éxitos de Rock",
      image: "/images/pink-floyd.jpg",
      href: "/categories/exitos-rock",
    },
    {
      title: "Ediciones de Colección",
      image: "/images/metallica.jpg",
      href: "/categories/ediciones-coleccion",
    },
  ];

  return (
    <div
      className="features-container"
      style={{
        padding: "32px 16px",
        backgroundColor: "var(--section)",
        color: "var(--text)",
        borderRadius: "16px",
        boxShadow: "var(--shadow)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        margin: "40px auto",
        maxWidth: "1100px",
        position: "relative",
      }}
    >
      {/* Category Links Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {categorySections.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            style={{
              textDecoration: "none",
              color: "var(--text)",
              width: 220,
              display: "block",
              borderRadius: "14px",
              boxShadow: "var(--shadow)",
              background: card,
              padding: "24px 10px",
              textAlign: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "var(--shadow)",
              }}
            />
            <div
              style={{
                color: "var(--accent)",
                fontWeight: "bold",
                fontSize: "1.15rem",
                marginBottom: "0.3rem",
              }}
            >
              {cat.title}
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                color: "var(--muted)",
                fontWeight: 600,
                fontSize: "0.98rem",
              }}
            >
              Ver más &rarr;
            </span>
          </Link>
        ))}
      </div>

      {/* Carousel Row with Highlighted Header */}
      <div className="features-carousel-row">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "var(--accent)",
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "1px",
          }}
        >
          🔥Nuevas Llegadas
        </h2>
        {mounted && (
          <Slider {...settings}>
            {newReleases.map((release) => (
              <div key={release.id} className="carousel-item" style={{ position: "relative", padding: "10px" }}>
                <Link href={`/albumdetails?id=${release.id}`}>
                  <div style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow)",
                    transition: "transform 0.3s",
                    background: card,
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
                    <div style={{
                      textAlign: "center",
                      padding: "10px 0 0 0",
                    }}>
                      <h4 style={{
                        margin: 0,
                        color: "var(--accent)",
                        fontWeight: "bold",
                        fontSize: "1.05rem",
                      }}>{release.title}</h4>
                      <p style={{
                        margin: 0,
                        color: text,
                        fontWeight: "bold",
                        fontSize: "0.98rem",
                      }}>{release.price}</p>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: 8,
                          color: "var(--accent)",
                          fontWeight: 600,
                          fontSize: "0.98rem",
                          textDecoration: "underline",
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                      >
                        Ver más &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
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
          @media (max-width: 900px) {
            .features-container {
              padding: 18px 2vw;
            }
            .carousel-item {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            .features-container {
              padding: 10px 1vw;
            }
            .carousel-item {
              min-width: 90vw;
              max-width: 95vw;
              padding: 8px 2px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Features;

