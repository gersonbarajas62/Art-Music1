"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../../utils/supabaseProducts";

const BeatlesPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBeatles() {
      setLoading(true);
      const allProducts = await getProductsWithImages();
      setProducts(allProducts.filter((p: any) => p.beatlesShowcase === true));
      setLoading(false);
    }
    fetchBeatles();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.title.toLowerCase().includes(term) ||
      product.artist.toLowerCase().includes(term) ||
      (product.tags && product.tags.join(",").toLowerCase().includes(term))
    );
  });

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
        The Beatles - Colección Completa
      </h2>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 32,
        paddingRight: 32,
        gap: 18,
      }}>
        <span style={{
          color: "var(--muted)",
          fontWeight: 500,
          fontSize: "1.08rem",
          marginRight: 12,
        }}>
          {loading ? "" : `${filteredProducts.length} resultado${filteredProducts.length === 1 ? "" : "s"}`}
        </span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, artista o etiqueta..."
          style={{
            width: "100%",
            maxWidth: 340,
            padding: "12px 18px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            fontSize: "1.08rem",
            outline: "none",
            boxShadow: "0 2px 8px var(--shadow)",
            marginLeft: "auto",
          }}
        />
      </div>
      {loading ? (
        <div style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>Cargando productos Beatles...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>No hay productos Beatles registrados.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px",
            padding: "0 32px",
          }}
        >
          {filteredProducts.map((item: any) => (
            <div
              key={item.id}
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
                transition: "transform 0.18s, box-shadow 0.18s",
                width: 260,
                margin: "0 auto",
                gap: 8,
                border: "1px solid var(--border)",
              }}
              className="beatles-card"
            >
              {item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    boxShadow: "var(--shadow)",
                    letterSpacing: "1px",
                  }}
                >
                  {item.badge}
                </span>
              )}
              {/* Images */}
              {item.images && item.images.length > 0 ? (
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
                  {item.images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${item.title} img${idx + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1.5px solid var(--border)",
                        background: "var(--card)",
                        boxShadow: "var(--shadow)",
                        marginBottom: "4px",
                        transition: "transform 0.18s, box-shadow 0.18s",
                      }}
                      className="beatles-img"
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "10px",
                    background: "var(--section)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: "16px",
                  }}
                >
                  Sin imagen
                </div>
              )}
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
                {item.oldPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "var(--muted)",
                      fontSize: "1rem",
                    }}
                  >
                    ${item.oldPrice}
                  </span>
                )}
              </div>
              {/* Extra info */}
              <div style={{ width: "100%", marginBottom: 4 }}>
                <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "2px", textAlign: "left", width: "100%", display: "flex", gap: 6 }}>
                  <span style={{ fontWeight: 600, minWidth: 70 }}>Tipo:</span>
                  <span>{item.tipo}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "2px", textAlign: "left", width: "100%", display: "flex", gap: 6 }}>
                  <span style={{ fontWeight: 600, minWidth: 70 }}>Género:</span>
                  <span>{item.genero}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "2px", textAlign: "left", width: "100%", display: "flex", gap: 6 }}>
                  <span style={{ fontWeight: 600, minWidth: 70 }}>Estado:</span>
                  <span>{item.estado}</span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "2px", textAlign: "left", width: "100%", display: "flex", gap: 6 }}>
                  <span style={{ fontWeight: 600, minWidth: 70 }}>Condición:</span>
                  <span>{item.condicion}</span>
                </div>
              </div>
              {/* Ver más button */}
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
                }}
                onClick={() => window.location.href = `/albumdetails/${item.id}`}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          .beatles-card:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px #FFD700, 0 2px 12px #FFD700;
            border: 2px solid #FFD700;
          }
          .beatles-img:hover {
            transform: scale(1.08);
            box-shadow: 0 4px 16px #FFD700;
          }
          @media (max-width: 900px) {
            section {
              padding: 24px 2vw !important;
            }
            .beatles-card {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            section {
              padding: 8px 2vw !important;
            }
            .beatles-card {
              min-width: 95vw;
              max-width: 98vw;
              padding: 10px 4px 14px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default BeatlesPage;
