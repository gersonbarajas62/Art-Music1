"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../../utils/supabaseProducts";
import ImageWithLoader from "../../Components/ImageWithLoader";

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

const BeatlesPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const sortOptions = [
    { value: "price-asc", label: "Precio: Menor a Mayor" },
    { value: "price-desc", label: "Precio: Mayor a Menor" },
    { value: "title-asc", label: "Título: A-Z" },
    { value: "title-desc", label: "Título: Z-A" },
    { value: "artist-asc", label: "Artista: A-Z" },
    { value: "artist-desc", label: "Artista: Z-A" },
    { value: "newest", label: "Más Nuevos" },
  ];

  useEffect(() => {
    async function fetchBeatles() {
      setLoading(true);
      const allProducts = await getProductsWithImages();
      setProducts(allProducts.filter((p: any) => p.beatlesShowcase === true));
      setLoading(false);
    }
    fetchBeatles();
  }, []);

  // Get unique genres, artists for filters
  const genres = Array.from(new Set(products.map(p => p.genero).filter(Boolean)));
  const artists = Array.from(new Set(products.map(p => p.artist).filter(Boolean)));

  // Filtering logic
  let filtered = products.filter(p => {
    const term = search.toLowerCase();
    return (
      (!genre || p.genero === genre) &&
      (!artist || p.artist === artist) &&
      (minPrice === "" || p.price >= Number(minPrice)) &&
      (maxPrice === "" || p.price <= Number(maxPrice)) &&
      (
        p.title.toLowerCase().includes(term) ||
        p.artist.toLowerCase().includes(term) ||
        p.genero?.toLowerCase().includes(term)
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
        borderRadius: "20px",
        margin: "40px auto",
        maxWidth: "1200px",
        padding: "48px 0px",
        boxShadow: "var(--shadow)",
        position: "relative",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
      }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2.3rem", marginBottom: 32, textAlign: "center", textShadow: "0 2px 8px var(--bg)" }}>
        The Beatles - Colección Completa
      </h2>
      {/* Filters */}
      <div style={{
        background: "var(--card)",
        borderRadius: "14px",
        boxShadow: "var(--shadow)",
        maxWidth: "900px",
        marginTop: 0,
        marginRight: "auto",
        marginBottom: 32,
        marginLeft: "auto",
        padding: "24px 18px 18px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        position: "sticky",
        top: 12,
        zIndex: 10,
      }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, artista, género..."
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--section)",
            color: "var(--text)",
            fontSize: "1.15rem",
            outline: "none",
            boxShadow: "0 2px 8px var(--shadow)",
            marginBottom: "8px",
            fontWeight: 500,
          }}
        />
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <select value={genre} onChange={e => setGenre(e.target.value)} style={selectStyle}>
              <option value="">Género</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={artist} onChange={e => setArtist(e.target.value)} style={selectStyle}>
              <option value="">Artista</option>
              {artists.map(a => <option key={a} value={a}>{a}</option>)}
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
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ ...selectStyle, minWidth: 160 }}>
              {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: "bold",
                fontSize: "0.98rem",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
                letterSpacing: "1px",
                transition: "background-color 0.2s",
              }}
              onClick={() => {
                setGenre(""); setArtist(""); setMinPrice(""); setMaxPrice(""); setSearch("");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "28px",
          justifyContent: "center",
          padding: "0 16px 18px 16px",
          zIndex: 3,
          position: "relative",
        }}
      >
        {filtered.map((item: any) => (
          <div
            key={item.id}
            style={{
              minWidth: 280,
              maxWidth: 340,
              width: "100%",
              flex: "1 1 320px",
              backgroundColor: "var(--card)",
              borderRadius: "18px",
              boxShadow: "var(--shadow)",
              padding: "0 0 28px 0",
              textAlign: "left",
              position: "relative",
              transition: "transform 0.25s, box-shadow 0.25s, border 0.25s",
              border: "2px solid var(--border)",
              margin: "12px 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflow: "hidden",
              alignItems: "stretch",
              background: "var(--card)",
              cursor: "pointer",
            }}
            className="beatles-card"
            onClick={() => window.location.href = `/albumdetails/${item.id}`}
          >
            {item.badge && (
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
                  zIndex: 3,
                }}
              >
                {item.badge}
              </span>
            )}
            <div
              style={{
                width: "100%",
                height: "180px",
                overflow: "hidden",
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "18px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                margin: 0,
                padding: 0,
                zIndex: 2,
              }}
            >
              <ImageWithLoader
                src={item.images?.[0] || ""}
                alt={item.title}
                className="beatles-main-img"
              />
            </div>
            <div
              style={{
                padding: "198px 18px 0 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div style={{
                fontWeight: 700,
                fontSize: "1.18rem",
                color: "var(--accent)",
                lineHeight: "1.2",
                textAlign: "left",
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: "1.05rem",
                color: "var(--muted)",
                fontWeight: 500,
              }}>
                {item.artist}
              </div>
              <div style={{
                fontSize: "0.98rem",
                color: "var(--muted)",
              }}>
                {item.genero}
              </div>
              <div style={{
                fontSize: "1.18rem",
                color: "var(--accent)",
                fontWeight: "bold",
                margin: "8px 0 0 0",
              }}>
                ${item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          .beatles-card {
            background: var(--card);
            border: 2px solid var(--border);
            box-shadow: var(--shadow);
            transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
            position: relative;
            overflow: hidden;
          }
          /* Light mode: black shadow and accent border on hover */
          .beatles-card:hover {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
            background: var(--card);
          }
          /* Dark mode: white shadow and accent border on hover */
          .dark .beatles-card:hover {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 12px 36px #fff, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
            background: var(--card);
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
