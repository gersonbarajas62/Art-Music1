"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../../utils/supabaseProducts";

const sortOptions = [
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "title-asc", label: "Título: A-Z" },
  { value: "title-desc", label: "Título: Z-A" },
  { value: "artist-asc", label: "Artista: A-Z" },
  { value: "artist-desc", label: "Artista: Z-A" },
  { value: "newest", label: "Más Nuevos" },
];

export default function CatalogoPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsWithImages().then(all => {
      setProducts(all);
      setLoading(false);
    });
  }, []);

  // Get unique genres, artists, types for filters
  const genres = Array.from(new Set(products.map(p => p.genero).filter(Boolean)));
  const artists = Array.from(new Set(products.map(p => p.artist).filter(Boolean)));
  const types = Array.from(new Set(products.map(p => p.tipo).filter(Boolean)));

  // Filtering logic
  let filtered = products.filter(p => {
    const term = search.toLowerCase();
    return (
      (!genre || p.genero === genre) &&
      (!artist || p.artist === artist) &&
      (!type || p.tipo === type) &&
      (minPrice === "" || p.price >= Number(minPrice)) &&
      (maxPrice === "" || p.price <= Number(maxPrice)) &&
      (
        p.title.toLowerCase().includes(term) ||
        p.artist.toLowerCase().includes(term) ||
        p.genero?.toLowerCase().includes(term) ||
        p.tipo?.toLowerCase().includes(term) ||
        (p.tags && p.tags.join(",").toLowerCase().includes(term))
      )
    );
  });

  // Sorting logic
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "title-asc": return a.title.localeCompare(b.title);
      case "title-desc": return b.title.localeCompare(a.title);
      case "artist-asc": return a.artist.localeCompare(b.artist);
      case "artist-desc": return b.artist.localeCompare(a.artist);
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return 0;
    }
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
        Catálogo Completo
      </h2>
      {/* Filters */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "18px",
        marginBottom: "32px",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 32px",
      }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, artista, género, tipo..."
          style={{
            width: "100%",
            maxWidth: 260,
            padding: "12px 18px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            fontSize: "1.08rem",
            outline: "none",
            boxShadow: "0 2px 8px var(--shadow)",
          }}
        />
        <select value={genre} onChange={e => setGenre(e.target.value)} style={selectStyle}>
          <option value="">Género</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={artist} onChange={e => setArtist(e.target.value)} style={selectStyle}>
          <option value="">Artista</option>
          {artists.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
          <option value="">Tipo</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="Precio mínimo"
          style={selectStyle}
          min={0}
        />
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="Precio máximo"
          style={selectStyle}
          min={0}
        />
        <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      {/* Results */}
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
          {loading ? "" : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`}
        </span>
      </div>
      {loading ? (
        <div style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>Cargando catálogo...</div>
      ) : filtered.length === 0 ? (
        <div style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>No hay productos registrados.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px",
            padding: "0 32px",
          }}
        >
          {filtered.map((item: any) => (
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
              className="catalog-card"
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
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1.5px solid var(--border)",
                    background: "var(--card)",
                    boxShadow: "var(--shadow)",
                    marginBottom: "4px",
                  }}
                />
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
          .catalog-card:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px #FFD700, 0 2px 12px #FFD700;
            border: 2px solid #FFD700;
          }
          @media (max-width: 900px) {
            section {
              padding: 24px 2vw !important;
            }
            .catalog-card {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            section {
              padding: 8px 2vw !important;
            }
            .catalog-card {
              min-width: 95vw;
              max-width: 98vw;
              padding: 10px 4px 14px;
            }
          }
        `}
      </style>
    </section>
  );
}

const selectStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  fontSize: "1.08rem",
  outline: "none",
  boxShadow: "0 2px 8px var(--shadow)",
  minWidth: 120,
  maxWidth: 180,
};
