"use client";
import React, { useState } from "react";
import Slider from "react-slick";

const mockOnSale = [
  {
    id: 1,
    title: "Vinilo: Pink Floyd – The Wall",
    artist: "Pink Floyd",
    price: 950,
    oldPrice: 1200,
    image: "/images/pinkfloyd.jpg",
    tipo: "Vinilo",
    genero: "Rock Progresivo",
    estado: "Nuevo",
    condicion: "Sellado",
  },
  {
    id: 2,
    title: "CD: Led Zeppelin – IV",
    artist: "Led Zeppelin",
    price: 350,
    oldPrice: 450,
    image: "/images/ledzep.jpg",
    tipo: "CD",
    genero: "Rock Clásico",
    estado: "Usado",
    condicion: "Muy bueno",
  },
  {
    id: 3,
    title: "Vinilo: Queen – A Night at the Opera",
    artist: "Queen",
    price: 800,
    oldPrice: 1000,
    image: "/images/queen.jpg",
    tipo: "Vinilo",
    genero: "Rock",
    estado: "Usado",
    condicion: "Excelente",
  },
  {
    id: 4,
    title: "CD: Nirvana – Nevermind",
    artist: "Nirvana",
    price: 300,
    oldPrice: 400,
    image: "/images/nirvana.jpg",
    tipo: "CD",
    genero: "Grunge",
    estado: "Nuevo",
    condicion: "Sellado",
  },
  {
    id: 5,
    title: "Vinilo: The Beatles – Abbey Road",
    artist: "The Beatles",
    price: 1100,
    oldPrice: 1400,
    image: "/images/beatles.jpg",
    tipo: "Vinilo",
    genero: "Rock",
    estado: "Usado",
    condicion: "Bueno",
  },
  {
    id: 6,
    title: "CD: Metallica – Black Album",
    artist: "Metallica",
    price: 400,
    oldPrice: 500,
    image: "/images/metallica.jpg",
    tipo: "CD",
    genero: "Metal",
    estado: "Nuevo",
    condicion: "Sellado",
  },
  {
    id: 7,
    title: "Vinilo: AC/DC – Back in Black",
    artist: "AC/DC",
    price: 900,
    oldPrice: 1100,
    image: "/images/acdc.jpg",
    tipo: "Vinilo",
    genero: "Rock",
    estado: "Usado",
    condicion: "Muy bueno",
  },
  {
    id: 8,
    title: "CD: Soda Stereo – Signos",
    artist: "Soda Stereo",
    price: 320,
    oldPrice: 400,
    image: "/images/soda.jpg",
    tipo: "CD",
    genero: "Rock Latino",
    estado: "Nuevo",
    condicion: "Sellado",
  },
];

const infoStyle = (isDark: boolean) => ({
  fontSize: "0.95rem",
  color: "var(--muted)",
  marginBottom: "2px",
  textAlign: "left" as const,
  width: "100%",
  display: "flex",
  gap: 6,
});

const OnSale = () => {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const [added, setAdded] = useState<number | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 4, slidesToScroll: 4, rows: 2 },
      },
      {
        breakpoint: 1100,
        settings: { slidesToShow: 3, slidesToScroll: 3, rows: 2 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2, slidesToScroll: 2, rows: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, rows: 2 },
      },
    ],
  };

  const handleAddToCart = (id: number) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1200);
    // Add to cart logic here
  };

  return (
    <section
      style={{
        background: "var(--section)",
        color: "var(--text)",
        padding: "48px 0px",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "1600px",
        boxShadow: "var(--shadow)",
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
          color: "var(--accent)",
          marginBottom: "32px",
          textAlign: "center",
          textShadow: "0 2px 8px var(--bg)",
        }}
      >
        ¡Ofertas Especiales!
      </h2>
      <div style={{ padding: "0 32px" }}>
        <Slider {...settings}>
          {mockOnSale.map((item) => (
            <div key={item.id} style={{ padding: "18px 18px 32px 18px" }}>
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "14px",
                  boxShadow: "var(--shadow)",
                  padding: "28px 18px 22px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  minHeight: 420,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  outline: added === item.id ? "2px solid var(--accent)" : "none",
                  transform: added === item.id ? "scale(1.04)" : "none",
                  width: 220,
                  margin: "0 auto",
                  gap: 8,
                  border: "1px solid var(--border)",
                }}
                onClick={() => handleAddToCart(item.id)}
                tabIndex={0}
                aria-label={`Agregar ${item.title} al carrito`}
              >
                {/* Sale badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "var(--accent)",
                    color: "var(--bg)",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    boxShadow: "var(--shadow)",
                    letterSpacing: "1px",
                  }}
                >
                  Oferta
                </span>
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border)",
                    marginBottom: "18px",
                    background: "var(--card)",
                    boxShadow: "var(--shadow)",
                  }}
                />
                {/* Info */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "var(--accent)",
                    fontSize: "1.1rem",
                    textShadow: "0 2px 8px var(--bg)",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  {item.artist}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    ${item.price}
                  </span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "var(--muted)",
                      fontSize: "1rem",
                    }}
                  >
                    ${item.oldPrice}
                  </span>
                </div>
                {/* Extra info */}
                <div style={{ width: "100%", marginBottom: 4 }}>
                  <div style={infoStyle(isDark)}>
                    <span style={{ fontWeight: 600, minWidth: 70 }}>Tipo:</span>
                    <span>{item.tipo}</span>
                  </div>
                  <div style={infoStyle(isDark)}>
                    <span style={{ fontWeight: 600, minWidth: 70 }}>Género:</span>
                    <span>{item.genero}</span>
                  </div>
                  <div style={infoStyle(isDark)}>
                    <span style={{ fontWeight: 600, minWidth: 70 }}>Estado:</span>
                    <span>{item.estado}</span>
                  </div>
                  <div style={infoStyle(isDark)}>
                    <span style={{ fontWeight: 600, minWidth: 70 }}>Condición:</span>
                    <span>{item.condicion}</span>
                  </div>
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
                    outline: added === item.id ? "2px solid var(--accent)" : "none",
                    opacity: added === item.id ? 0.7 : 1,
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(item.id);
                  }}
                  disabled={added === item.id}
                >
                  {added === item.id ? "¡Agregado!" : "Agregar al carrito"}
                </button>
              </div>
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
          .slick-slide > div {
            display: flex;
            justify-content: center;
            align-items: stretch;
            height: 100%;
          }
          .slick-list {
            margin-bottom: 24px !important;
          }
        `}
      </style>
    </section>
  );
};

export default OnSale;