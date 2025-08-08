"use client";
import Link from "next/link";
import { useState } from "react";

const beatlesItems = [
	{
		id: 1,
		title: "The Beatles: Abbey Road (Vinilo Edición Limitada)",
		price: "$59.99",
		image: "/images/beatles-abbeyroad.jpg",
		badge: "Edición Limitada",
		featured: true,
	},
	{
		id: 2,
		title: "The Beatles: White Album (Box Set)",
		price: "$129.99",
		image: "/images/beatles-whitealbum.jpg",
		badge: "Box Set",
	},
	{
		id: 3,
		title: "The Beatles: Sgt. Pepper's (Vinilo Remasterizado)",
		price: "$49.99",
		image: "/images/beatles-sgtpepper.jpg",
		badge: "Remasterizado",
	},
	{
		id: 4,
		title: "The Beatles: Revolver (CD Deluxe)",
		price: "$34.99",
		image: "/images/beatles-revolver.jpg",
		badge: "Deluxe",
	},
	{
		id: 5,
		title: "The Beatles: Let It Be (Vinilo)",
		price: "$44.99",
		image: "/images/beatles-letitbe.jpg",
		badge: "Vinilo",
	},
];

const goldText = {
  color: "#E6B800",
  textShadow: "2px 2px 0 #000, 0 0 8px #E6B800",
  fontWeight: "bold",
};

const BeatlesShowcase = () => {
    const [cart, setCart] = useState<number[]>([]);
    const isDark =
        typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark");

    return (
        <section
            style={{
                background: "var(--section)",
                color: "var(--text)",
                borderRadius: "20px",
                margin: "56px auto 40px",
                maxWidth: "1200px",
                padding: "56px 0 48px",
                boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Beatles Specialist Ribbon */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(90deg, #E6B800 60%, #FFD700 100%)",
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    padding: "8px 32px",
                    borderRadius: "0 0 18px 18px",
                    boxShadow: "0 2px 8px #E6B800",
                    zIndex: 10,
                    letterSpacing: "1px",
                }}
            >
                <span role="img" aria-label="beatles">🎤</span> Especialistas en The Beatles
            </div>

            {/* Animated Glow Behind Title */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 340,
                    height: 80,
                    background: "radial-gradient(circle, #FFD70088 0%, transparent 70%)",
                    filter: "blur(12px)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            {/* Optional Beatles logo motif */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 320,
                    height: 320,
                    opacity: 0.07,
                    background: `url('/images/beatles-motif.png') center/contain no-repeat`,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            {/* Fade edges for scroll */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 60,
                    height: "100%",
                    background: isDark
                        ? "linear-gradient(90deg, #232526 80%, transparent)"
                        : "linear-gradient(90deg, #fffbe6 80%, transparent)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: 60,
                    height: "100%",
                    background: isDark
                        ? "linear-gradient(270deg, #232526 80%, transparent)"
                        : "linear-gradient(270deg, #fffbe6 80%, transparent)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />

            {/* Owner's note */}
            <div style={{
                textAlign: "center",
                marginBottom: 12,
                marginTop: 36,
                fontStyle: "italic",
                color: isDark ? "#FFD700" : "#B8860B",
                fontSize: "1.08rem",
                opacity: 0.92,
                zIndex: 3,
                position: "relative",
            }}>
                ¡El mayor catálogo de The Beatles en México, curado por fans para fans!
            </div>

            {/* Trust badge */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 18,
                zIndex: 3,
                position: "relative",
            }}>
                <span style={{
                    background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                    color: "#222",
                    fontWeight: "bold",
                    borderRadius: "16px",
                    padding: "6px 22px",
                    fontSize: "1rem",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
                    letterSpacing: "0.5px",
                    border: "2px solid #E6B800",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                    <span role="img" aria-label="star">⭐</span> +500 ventas &nbsp;|&nbsp; Garantía de autenticidad
                </span>
            </div>

            <h2
                style={{
                    textAlign: "center",
                    fontSize: "2.7rem",
                    fontWeight: "bold",
                    marginBottom: "22px",
                    letterSpacing: "1.5px",
                    color: "var(--text)", // No gold!
                    textShadow: "0 2px 8px var(--bg)",
                    zIndex: 3,
                    position: "relative",
                }}
            >
                🎸 The Beatles Collection
            </h2>
            <p
                style={{
                    textAlign: "center",
                    color: "var(--muted)",
                    fontSize: "1.25rem",
                    marginBottom: "38px",
                    opacity: 0.95,
                    fontWeight: 500,
                }}
            >
                Descubre nuestra exclusiva selección de vinilos, box sets y ediciones especiales de{" "}
                <b>The Beatles</b>. ¡Solo en Artmusic!
            </p>
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    overflowX: "auto",
                    padding: "0 32px 18px 32px",
                    scrollbarWidth: "thin",
                    zIndex: 3,
                    position: "relative",
                }}
            >
                {beatlesItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            minWidth: 320,
                            maxWidth: 340,
                            backgroundColor: isDark ? "#232323" : "#fff",
                            borderRadius: "18px",
                            boxShadow: isDark
                                ? "0 4px 18px #E6B800"
                                : "0 4px 18px rgba(0,0,0,0.13)",
                            padding: "24px 18px 28px",
                            textAlign: "center",
                            position: "relative",
                            flex: "0 0 auto",
                            transition: "transform 0.25s, box-shadow 0.25s",
                            border: "3px solid transparent",
                        }}
                        className="beatles-card"
                    >
                        {item.featured && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: 18,
                                    right: 18,
                                    background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                                    color: "#b80000",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    padding: "4px 16px",
                                    fontSize: "1rem",
                                    boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
                                    letterSpacing: "0.5px",
                                    zIndex: 2,
                                    border: "2px solid #b80000",
                                }}
                            >
                                ★ Destacado
                            </span>
                        )}
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: "100%",
                                height: "220px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                marginBottom: "16px",
                                boxShadow: isDark
                                    ? "0 2px 12px #FFD700"
                                    : "0 2px 12px #000",
                            }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                top: 18,
                                left: 18,
                                background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                                color: "#222",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                padding: "4px 16px",
                                fontSize: "1rem",
                                boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
                                letterSpacing: "0.5px",
                                zIndex: 2,
                            }}
                        >
                            {item.badge}
                        </span>
                        <h3
                            style={{
                                margin: "18px 0 6px",
                                color: "#FFD700",
                                fontWeight: 700,
                                fontSize: "1.18rem",
                                minHeight: "2.2em",
                            }}
                        >
                            {item.title}
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "bold",
                                color: isDark ? "#fff" : "#222",
                                fontSize: "1.13rem",
                            }}
                        >
                            {item.price}
                        </p>
                        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center" }}>
                            <Link
                                href={`/albumdetails?id=${item.id}`}
                                style={{
                                    background: "#FFD700",
                                    color: "#222",
                                    borderRadius: "8px",
                                    padding: "12px 18px",
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    fontSize: "1.08rem",
                                    boxShadow: isDark
                                        ? "0 2px 8px #FFD700"
                                        : "0 2px 8px #000",
                                    transition: "background 0.2s, color 0.2s",
                                    display: "inline-block",
                                }}
                            >
                                Ver detalle
                            </Link>
                            <button
                                onClick={() => setCart((prev) => prev.includes(item.id) ? prev : [...prev, item.id])}
                                disabled={cart.includes(item.id)}
                                style={{
                                    background: cart.includes(item.id) ? "#bbb" : "#FFD700",
                                    color: "#222",
                                    borderRadius: "8px",
                                    padding: "12px 18px",
                                    fontWeight: "bold",
                                    fontSize: "1.08rem",
                                    border: "none",
                                    cursor: cart.includes(item.id) ? "not-allowed" : "pointer",
                                    boxShadow: isDark
                                        ? "0 2px 8px #FFD700"
                                        : "0 2px 8px #000",
                                    transition: "background 0.2s, color 0.2s",
                                    marginLeft: 0,
                                    display: "inline-block",
                                }}
                            >
                                {cart.includes(item.id) ? "Agregado" : "Agregar"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Highlighted call-to-action button */}
            <div style={{ textAlign: "center", marginTop: 44 }}>
                <a
                    href="/categories/vinilos-exclusivos?artist=the-beatles"
                    style={{
                        background: "var(--accent)",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "18px 44px",
                        fontWeight: "bold",
                        fontSize: "1.18rem",
                        textDecoration: "none",
                        boxShadow: "0 2px 12px var(--accent2)",
                        transition: "background 0.2s, color 0.2s",
                        display: "inline-block",
                    }}
                >
                    Ver toda la colección de The Beatles &rarr;
                </a>
            </div>
            <style>
                {`
          .beatles-card:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px #FFD700, 0 2px 12px #FFD700;
            border: 3px solid #FFD700;
          }
          @media (max-width: 900px) {
            .beatles-card {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            .beatles-card {
              min-width: 90vw;
              max-width: 95vw;
              padding: 14px 6px 18px;
            }
          }
        `}
            </style>
        </section>
    );
};

export default BeatlesShowcase;