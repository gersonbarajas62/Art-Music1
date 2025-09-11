"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductsWithImages } from "../../../utils/supabaseProducts";
import { CartContext } from "../../../Components/CartProvider";

// Reusable ProductDetails component
const ProductDetails = ({ product, recommendations }: { product: any, recommendations: any[] }) => {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [fullView, setFullView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const { addToCart } = React.useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) return (
    <div style={{
      textAlign: "center",
      marginTop: 80,
      color: "var(--muted)",
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "40px",
      background: "var(--card)",
      borderRadius: 16,
      boxShadow: "var(--shadow)",
      maxWidth: 500,
      margin: "80px auto"
    }}>
      Producto no encontrado.
    </div>
  );

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          maxWidth: 1200,
          margin: "40px auto 0 auto",
          background: "var(--section)",
          borderRadius: "18px",
          boxShadow: "var(--shadow)",
          minHeight: 600,
          position: "relative",
          padding: 0,
          overflow: "visible",
        }}
      >
        {/* Left: Sticky Image Container */}
        <div style={{
          width: "100%",
          maxWidth: 520,
          minWidth: 320,
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f6f6",
          borderRadius: "18px 0 0 18px",
          boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
          overflow: "hidden",
          zIndex: 2,
        }}>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[selectedImg]}
              alt={product.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "cover",
                borderRadius: 18,
                boxShadow: "0 8px 32px var(--shadow)",
                background: "#fff",
                border: "3px solid #fff",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                display: 'block',
              }}
              onClick={() => setFullView(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 18,
                background: "#eaeaea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bbb",
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: "var(--shadow)",
              }}
            >
              Sin imagen
            </div>
          )}
          {/* Full view modal overlays everything */}
          {fullView && (
            <div
              tabIndex={0}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.93)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99999,
                cursor: "zoom-out",
                animation: "fadeIn 0.3s",
                paddingTop: "48px",
                paddingBottom: "48px",
                boxSizing: "border-box",
              }}
              onClick={() => setFullView(false)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') setSelectedImg(i => Math.min(i+1, product.images.length-1));
                if (e.key === 'ArrowLeft') setSelectedImg(i => Math.max(i-1, 0));
                if (e.key === 'Escape') setFullView(false);
              }}
            >
              <button
                style={{
                  position: "absolute",
                  left: 32,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "#fff",
                  fontSize: "2.2rem",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  cursor: selectedImg > 0 ? "pointer" : "not-allowed",
                  opacity: selectedImg > 0 ? 1 : 0.5,
                  zIndex: 100,
                }}
                disabled={selectedImg === 0}
                onClick={e => {e.stopPropagation(); setSelectedImg(i => Math.max(i-1, 0));}}
                aria-label="Anterior"
              >&#8592;</button>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                <img
                  src={product.images[selectedImg]}
                  alt={product.title}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "70vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 22,
                    boxShadow: "0 8px 32px #FFD700",
                    border: "4px solid var(--accent)",
                    display: 'block',
                  }}
                />
              </div>
              <button
                style={{
                  position: "absolute",
                  right: 32,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "#fff",
                  fontSize: "2.2rem",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  cursor: selectedImg < product.images.length-1 ? "pointer" : "not-allowed",
                  opacity: selectedImg < product.images.length-1 ? 1 : 0.5,
                  zIndex: 100,
                }}
                disabled={selectedImg === product.images.length-1}
                onClick={e => {e.stopPropagation(); setSelectedImg(i => Math.min(i+1, product.images.length-1));}}
                aria-label="Siguiente"
              >&#8594;</button>
            </div>
          )}
        </div>
        {/* Right: Product Details - compact buttons and info */}
        <div style={{
          flex: 1,
          minWidth: 0,
          background: "var(--card)",
          borderRadius: "0 18px 18px 0",
          boxShadow: "var(--shadow)",
          padding: "38px 32px 32px 32px",
          minHeight: 600,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative",
          gap: 14,
          zIndex: 1,
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#222",
        }}>
          {/* Badges and Title */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
            {product.badge && (
              <span style={{
                background: "#fff",
                color: "#111",
                borderRadius: 24,
                padding: "8px 22px",
                fontWeight: "bold",
                fontSize: "1.08rem",
                boxShadow: "var(--shadow)",
                display: 'inline-block',
              }}>{product.badge}</span>
            )}
            {product.featured && (
              <span style={{
                background: "#fff",
                color: "#111",
                borderRadius: 24,
                padding: "8px 22px",
                fontWeight: "bold",
                fontSize: "1.08rem",
                boxShadow: "var(--shadow)",
                display: 'inline-block',
              }}>Destacado</span>
            )}
            {product.newArrival && (
              <span style={{
                background: "#fff",
                color: "#111",
                borderRadius: 24,
                padding: "8px 22px",
                fontWeight: "bold",
                fontSize: "1.08rem",
                boxShadow: "var(--shadow)",
                display: 'inline-block',
              }}>Nuevo</span>
            )}
          </div>
          <h2 style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontWeight: "bold", fontSize: "2.3rem", marginBottom: 0, lineHeight: 1.1 }}>
            {product.title}
          </h2>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#eee" : "#222", fontSize: "1.18rem", fontWeight: "bold", marginBottom: 8 }}>
            {product.artist} &bull; {product.genero} &bull; {product.year}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "1.45rem", color: "var(--accent)", marginBottom: 18 }}>
            ${product.price}
            {product.oldPrice && (
              <span style={{
                textDecoration: "line-through",
                color: "#888",
                fontSize: "1.1rem",
                marginLeft: 14,
              }}>
                ${product.oldPrice}
              </span>
            )}
          </div>
          {/* Thumbnails - horizontal scroll */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
            {product.images && product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                style={{
                  background: idx === selectedImg ? "#fff" : "#eee",
                  border: idx === selectedImg ? "2px solid var(--accent)" : "1px solid #ccc",
                  borderRadius: 12,
                  boxShadow: "var(--shadow)",
                  cursor: "pointer",
                  opacity: idx === selectedImg ? 1 : 0.7,
                  transition: "border 0.2s, opacity 0.2s, background 0.2s",
                  padding: 0,
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                }}
                onClick={() => setSelectedImg(idx)}
                aria-label={`Imagen ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`mini-${idx + 1}`}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: 10,
                    boxShadow: "var(--shadow)",
                  }}
                />
              </button>
            ))}
          </div>
          {/* Product Info - Nike style */}
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Tipo:</b> {product.tipo}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Estado:</b> {product.estado}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Condición:</b> {product.condicion}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Número de Catálogo:</b> {product.numerodeCatalogo || '-'}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Stock:</b> {product.quantity}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Descripción:</b> {product.description}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Etiquetas:</b> {product.tags && product.tags.length > 0 ? product.tags.join(", ") : '-'}</div>
          <div style={{ color: document.documentElement.classList.contains("dark") ? "#fff" : "#111", fontSize: "1.15rem", marginBottom: 10 }}><b>Status:</b> {product.status === 'active' ? 'Activo' : 'Inactivo'}</div>
          <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
            <button
              style={{
                background: "#222",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontWeight: "bold",
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
                transition: "background 0.2s, color 0.2s",
                letterSpacing: "1px",
              }}
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.images?.[0] || product.image,
                  quantity: 1,
                });
                if (typeof window !== "undefined") {
                  const toast = document.createElement("div");
                  toast.textContent = "¡Producto agregado al carrito!";
                  toast.style.position = "fixed";
                  toast.style.bottom = "32px";
                  toast.style.right = "32px";
                  toast.style.background = "#222";
                  toast.style.color = "#fff";
                  toast.style.padding = "16px 28px";
                  toast.style.borderRadius = "10px";
                  toast.style.fontWeight = "bold";
                  toast.style.fontSize = "1.08rem";
                  toast.style.boxShadow = "var(--shadow)";
                  toast.style.zIndex = "99999";
                  toast.style.transition = "opacity 0.3s";
                  toast.style.opacity = "1";
                  document.body.appendChild(toast);
                  setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => document.body.removeChild(toast), 400);
                  }, 1800);
                }
              }}
            >
              Agregar al carrito
            </button>
            <button
              style={{
                background: "#fff",
                color: "#111",
                border: "1.5px solid #222",
                borderRadius: "10px",
                padding: "12px 24px",
                fontWeight: "bold",
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
                transition: "background 0.2s, color 0.2s",
                letterSpacing: "1px",
              }}
              onClick={() => router.push("/checkout")}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </section>
      {/* Recommendations full width below */}
      <div style={{
        width: "100%",
        maxWidth: 1200,
        margin: "48px auto 0 auto",
        background: "var(--card)",
        borderRadius: 14,
        boxShadow: "var(--shadow)",
        padding: "24px 18px",
        overflowX: "auto",
        position: "relative",
        zIndex: 0,
      }}>
        <h3 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.18rem", marginBottom: 18, textAlign: "center" }}>
          También te puede interesar
        </h3>
        <div style={{
          display: "flex",
          gap: "22px",
          overflowX: "auto",
          paddingBottom: 8,
        }}>
          {recommendations.length === 0 ? (
            <div style={{ color: "var(--muted)", fontWeight: "bold", fontSize: "1.05rem", padding: 24, textAlign: "center" }}>
              No hay recomendaciones similares.
            </div>
          ) : (
            recommendations.map((item: any) => (
              <div
                key={item.id}
                style={{
                  background: "var(--section)",
                  borderRadius: "10px",
                  boxShadow: "var(--shadow)",
                  padding: "14px 10px",
                  minWidth: 180,
                  maxWidth: 220,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid var(--border)",
                  transition: "transform 0.18s, box-shadow 0.18s",
                }}
                onClick={() => router.push(`/albumdetails/${item.id}`)}
                className="recommend-card"
              >
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                      boxShadow: "var(--shadow)",
                      marginBottom: 8,
                      transition: "transform 0.18s, box-shadow 0.18s",
                    }}
                    className="recommend-img"
                  />
                ) : (
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      background: "var(--card)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted)",
                      fontWeight: "bold",
                      fontSize: "1.05rem",
                      marginBottom: 8,
                    }}
                  >
                    Sin imagen
                  </div>
                )}
                <div style={{ fontWeight: "bold", color: "var(--accent)", fontSize: "1rem", marginBottom: 2, textAlign: "center" }}>
                  {item.title}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "0.97rem", marginBottom: 2, textAlign: "center" }}>
                  {item.artist}
                </div>
                <div style={{ fontSize: "1.02rem", fontWeight: "bold", color: "var(--accent)", marginBottom: 4, textAlign: "center" }}>
                  ${item.price}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          .recommend-card:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px #FFD700, 0 2px 12px #FFD700;
            border: 2px solid #FFD700;
          }
          .recommend-img:hover {
            transform: scale(1.08);
            box-shadow: 0 4px 16px #FFD700;
          }
          @media (max-width: 900px) {
            section {
              flex-direction: column !important;
              gap: 24px !important;
              padding: 18px 2vw !important;
              min-height: 100vh !important;
            }
            .details-right {
              margin-top: 0 !important;
            }
            .sticky-img {
              position: static !important;
              height: auto !important;
              top: auto !important;
            }
            .sticky-img img {
              width: 100% !important;
              height: auto !important;
              max-width: 100vw !important;
              max-height: 50vh !important;
            }
          }
          @media (max-width: 600px) {
            section {
              flex-direction: column !important;
              gap: 12px !important;
              padding: 8px 1vw !important;
              min-height: 100vh !important;
            }
            .details-right {
              margin-top: 0 !important;
            }
            .sticky-img {
              position: static !important;
              height: auto !important;
              top: auto !important;
            }
            .sticky-img img {
              width: 100% !important;
              height: auto !important;
              max-width: 100vw !important;
              max-height: 40vh !important;
            }
          }
        `}
      </style>
    </>
  );
};

const AlbumDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<any | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const allProducts = await getProductsWithImages();
      const found = allProducts.find((p: any) => String(p.id) === String(id));
      setProduct(found || null);
      // Recommendations: same genre or artist, exclude current product
      const recs = allProducts.filter(
        (p: any) =>
          p.id !== id &&
          (found?.genero && p.genero === found.genero ||
           found?.artist && p.artist === found.artist)
      ).slice(0, 6);
      setRecommendations(recs);
      setLoading(false);
    }
    if (id) fetchProduct();
  }, [id]);

    if (loading) {
      return (
        <div style={{
          textAlign: "center",
          marginTop: 80,
          color: "var(--muted)",
          fontWeight: "bold",
          fontSize: "1.2rem",
          padding: "40px",
          background: "var(--card)",
          borderRadius: 16,
          boxShadow: "var(--shadow)",
          maxWidth: 500,
          margin: "80px auto"
        }}>
          Cargando...
        </div>
      );
    }
  
    return (
      <ProductDetails product={product} recommendations={recommendations} />
    );
  };
  
  export default AlbumDetailsPage;
