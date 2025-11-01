"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductsWithImages } from "../utils/supabaseProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/Features.css";
import ImageWithLoader from "../Components/ImageWithLoader";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Features = () => {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
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

  const categorySections = [
    {
      title: "Vinilos Exclusivos",
      image: vinilosExclusivos[0]?.images?.[0] || "/images/beatles-vinyl.jpg",
      href: "/vinilos-exclusivos",
    },
    {
      title: "Éxitos de Rock",
      image: exitosRock[0]?.images?.[0] || "/images/pink-floyd.jpg",
      href: "/exitos-rock",
    },
    {
      title: "Ediciones de Colección",
      image: edicionesColeccion[0]?.images?.[0] || "/images/metallica.jpg",
      href: "/ediciones-coleccion",
    },
  ];

  // Fix carouselSettings: always set arrows: false and slidesToShow for mobile/tablet
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // <-- ensure 4 seconds
    arrows: false, // <-- always hide arrows
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 900, settings: { slidesToShow: 1, arrows: false } },
      { breakpoint: 600, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

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
        className="features-category-row"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          width: "100%",
          padding: "0 12px", // Add horizontal padding for all screens
        }}
      >
        {categorySections.map((cat) => (
          <div
            key={cat.title}
            className="features-category-card"
            style={{
              width: 220,
              minWidth: 220,
              maxWidth: 220,
              borderRadius: "14px",
              boxShadow: "var(--shadow)",
              background: "var(--card)",
              padding: "0 0 18px 0",
              textAlign: "center",
              transition: "transform 0.25s, box-shadow 0.25s, border 0.25s",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "hidden",
              margin: "0 auto",
            }}
            onClick={() => router.push(cat.href)}
          >
            {/* Large main image - covers top of cart */}
            <div
              style={{
                width: "100%",
                height: "120px",
                overflow: "hidden",
                borderTopLeftRadius: "14px",
                borderTopRightRadius: "14px",
                position: "relative",
                margin: 0,
                padding: 0,
                zIndex: 2,
              }}
            >
              <ImageWithLoader src={cat.image} alt={cat.title} className="features-main-img" />
            </div>
            {/* Info below image */}
            <div
              style={{
                padding: "18px 14px 0 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{
                fontWeight: 700,
                fontSize: "1.13rem",
                color: "var(--accent)",
                lineHeight: "1.2",
                textAlign: "center",
              }}>
                {cat.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Carousel Row with Highlighted Header */}
      <div className="features-carousel-row" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24, // Use only marginBottom, not both margin and marginBottom
            color: "var(--accent)",
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "1px",
          }}
        >
          🔥Nuevas Llegadas
        </h2>
        {mounted && (
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
              <Slider {...carouselSettings}>
                {nuevasLlegadas.map((release) => (
                  <div
                    key={release.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      minHeight: "220px",
                    }}
                  >
                    <div
                      className="carousel-card"
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "var(--shadow)",
                        background: "var(--card)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0 0 18px 0",
                        minHeight: "220px",
                        height: "100%",
                        width: "220px",
                        maxWidth: "220px",
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s, border 0.2s",
                        margin: "0 auto",
                        border: "2px solid var(--border)",
                      }}
                      onClick={() => router.push(`/albumdetails/${release.id}`)}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "120px",
                          overflow: "hidden",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                          position: "relative",
                          margin: 0,
                          padding: 0,
                          zIndex: 2,
                        }}
                      >
                        <img
                          src={release.image}
                          alt={release.title}
                          className="features-main-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            boxShadow: "var(--shadow)",
                            background: "var(--card)",
                            display: "block",
                            margin: 0,
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          padding: "14px 0 0 0",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            color: "var(--accent)",
                            fontWeight: "bold",
                            fontSize: "1.05rem",
                          }}
                        >
                          {release.title}
                        </h4>
                        <div
                          style={{
                            color: "var(--muted)",
                            fontSize: "0.98rem",
                            fontWeight: 500,
                          }}
                        >
                          {release.artist}
                        </div>
                        <div
                          style={{
                            color: "var(--muted)",
                            fontSize: "0.98rem",
                          }}
                        >
                          {release.tipo}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
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
                transition: "background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s",
              }}
              className="features-cta-btn"
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
          .features-category-row {
            justify-content: center;
            width: 100%;
          }
          .features-category-card {
            margin: 0 auto;
            background: var(--card);
            border: 2px solid var(--border);
            box-shadow: var(--shadow);
            transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
            position: relative;
            overflow: hidden;
            text-align: center;
          }
          .features-category-card:hover {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
            background: var(--card);
          }
          .carousel-card:hover {
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
            transform: translateY(-4px) scale(1.04);
            background: var(--card);
          }
          .features-cta-btn {
            background: var(--accent);
            color: var(--bg);
            border-radius: 10px;
            padding: 14px 38px;
            font-weight: bold;
            font-size: 1.12rem;
            border: none;
            box-shadow: 0 2px 12px var(--shadow);
            cursor: pointer;
            margin: 0 auto;
            letter-spacing: 1px;
            transition: background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s;
            display: inline-block;
          }
          .features-cta-btn:hover {
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            transform: translateY(-4px) scale(1.04);
            background: var(--accent);
            color: var(--bg);
          }
          .features-main-img {
            width: 100% !important;
            height: 120px !important;
            object-fit: cover !important;
            border-top-left-radius: 14px !important;
            border-top-right-radius: 14px !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            box-shadow: var(--shadow);
            margin: 0;
            display: block;
            transition: transform 0.2s, box-shadow 0.2s;
            position: relative;
            z-index: 2;
          }
          .features-main-img:hover {
            transform: scale(1.04);
            box-shadow: 0 4px 24px #fff;
          }
          .carousel-item.card-hover {
            margin: 0 auto;
            min-width: 220px;
            max-width: 220px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
          }
          .carousel-item.card-hover:hover {
            transform: scale(1.045);
            box-shadow: 0 12px 36px #fff, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
          }
          .carousel-card {
            margin: 0 auto;
            min-width: 220px;
            max-width: 220px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
          }
          @media (max-width: 1200px) {
            .features-container {
              padding: 18px 2vw;
            }
            .features-category-card, .carousel-item.card-hover {
              min-width: 220px !important;
              max-width: 220px !important;
            }
          }
          @media (max-width: 900px) {
            .features-container {
              padding: 10px 1vw;
            }
            .features-category-card, .carousel-item.card-hover {
              min-width: 220px !important;
              max-width: 220px !important;
              width: 220px !important;
            }
            .features-main-img, .carousel-image.features-main-img {
              height: 90px !important;
            }
            .features-carousel-row .slick-prev {
              left: -24px !important;
            }
            .features-carousel-row .slick-next {
              right: -24px !important;
            }
          }
          @media (max-width: 600px) {
            .features-container {
              padding: 4px 1vw;
            }
            .features-category-row {
              padding: 0 8px !important;
            }
            .features-category-card, .carousel-item.card-hover, .carousel-card {
              min-width: 94vw !important;
              max-width: 94vw !important;
              width: 94vw !important;
              margin: 0 auto 18px auto !important;
            }
            .features-main-img, .carousel-image.features-main-img {
              height: 70px !important;
            }
            .features-category-card > div {
              text-align: center !important;
              align-items: center !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Features;

