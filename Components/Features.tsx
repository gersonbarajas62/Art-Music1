"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getProductsWithImages } from "../utils/supabaseProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/Features.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Features = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      const all = await getProductsWithImages();
      setProducts(all);
    }
    fetchProducts();
    setMounted(true);
  }, []);

  // Filter products for each section
  const vinilosExclusivos = products.filter((p) => p.viniloExclusivo);
  const exitosRock = products.filter((p) => p.exitosRock);
  const edicionesColeccion = products.filter((p) => p.edicionColeccion);
  const nuevasLlegadas = products.filter((p) => p.newArrival);

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
    slidesToShow: 4, // Show 4 cards per view
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds animation
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const categorySections = [
    {
      title: "Vinilos Exclusivos",
      image: vinilosExclusivos[0]?.images?.[0] || "/images/beatles-vinyl.jpg",
      href: "/vinilos-exclusivos",
      count: vinilosExclusivos.length,
    },
    {
      title: "Éxitos de Rock",
      image: exitosRock[0]?.images?.[0] || "/images/pink-floyd.jpg",
      href: "/exitos-rock",
      count: exitosRock.length,
    },
    {
      title: "Ediciones de Colección",
      image: edicionesColeccion[0]?.images?.[0] || "/images/metallica.jpg",
      href: "/ediciones-coleccion",
      count: edicionesColeccion.length,
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
              background: "var(--card)",
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
              {cat.count} productos &nbsp;|&nbsp; Ver más &rarr;
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
            {nuevasLlegadas.map((release) => (
              <div
                key={release.id}
                className="carousel-item card-hover"
                style={{
                  position: "relative",
                  padding: "18px 12px",
                  margin: "0 8px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Link href={`/albumdetails/${release.id}`}>
                  <div
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow)",
                      background: "var(--card)",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "18px 10px",
                      minHeight: "320px",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <img
                      src={release.image}
                      alt={release.title}
                      className="carousel-image"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        boxShadow: "var(--shadow)",
                        transition: "transform 0.2s",
                      }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px 0 0 0",
                        width: "100%",
                      }}
                    >
                      <h4
                        style={{
                          margin: 0,
                          color: "var(--accent)",
                          fontWeight: "bold",
                          fontSize: "1.05rem",
                          marginBottom: "8px",
                        }}
                      >
                        {release.title}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          color: text,
                          fontWeight: "bold",
                          fontSize: "0.98rem",
                          marginBottom: "8px",
                        }}
                      >
                        {release.price}
                      </p>
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
        {/* Button only below the carousel */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/nuevas-llegadas">
            <button
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "10px",
                padding: "14px 38px",
                fontWeight: "bold",
                fontSize: "1.12rem",
                border: "none",
                boxShadow: "var(--shadow)",
                cursor: "pointer",
                margin: "0 auto",
                letterSpacing: "1px",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Ver todo lo nuevo &rarr;
            </button>
          </Link>
        </div>
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
          .carousel-item.card-hover {
            margin: 0 8px;
            min-width: 220px;
            max-width: 260px;
            box-sizing: border-box;
          }
          .carousel-item.card-hover:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px var(--accent), 0 2px 12px var(--accent);
            border: 2px solid var(--accent);
          }
          .carousel-image:hover {
            transform: scale(1.08);
            box-shadow: 0 4px 16px var(--accent);
          }
          .features-carousel-row .slick-slide {
            display: flex !important;
            align-items: stretch;
            height: auto !important;
          }
          .features-carousel-row .slick-list {
            padding: 12px 0 !important;
          }
          @media (max-width: 1200px) {
            .features-container {
              padding: 18px 2vw;
            }
            .carousel-item {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 900px) {
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

