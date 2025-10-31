"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../utils/supabaseProducts";
import { useRouter } from "next/navigation";

export default function OnSale() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    getProductsWithImages().then((all) => {
      // admin flag assumed to be `onSale`
      setProducts(all.filter((p: any) => p.onSale));
    });
  }, []);

  const genres = Array.from(
    new Set(products.map((p) => p.genero).filter(Boolean))
  );
  const artists = Array.from(
    new Set(products.map((p) => p.artist).filter(Boolean))
  );

  let filtered = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      (!genre || p.genero === genre) &&
      (!artist || p.artist === artist) &&
      (minPrice === "" || p.price >= Number(minPrice)) &&
      (maxPrice === "" || p.price <= Number(maxPrice)) &&
      (p.title.toLowerCase().includes(term) ||
        p.artist.toLowerCase().includes(term) ||
        p.genero?.toLowerCase().includes(term))
    );
  });

  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "artist-asc":
        return a.artist.localeCompare(b.artist);
      case "artist-desc":
        return b.artist.localeCompare(a.artist);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
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
      }}
    >
      <h2
        style={{
          color: "var(--accent)",
          fontWeight: "bold",
          fontSize: "2.3rem",
          marginBottom: 32,
          textAlign: "center",
          textShadow: "0 2px 8px var(--bg)",
        }}
      >
        Productos en Oferta
      </h2>

      {/* Filters */}
      <div
        style={{
          background: "var(--card)",
          borderRadius: "14px",
          boxShadow: "var(--shadow)",
          maxWidth: "900px",
          margin: "0 auto 32px",
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "sticky",
          top: 12,
          zIndex: 10,
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, artista, género..."
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--section)",
            color: "var(--text)",
            fontSize: "1.05rem",
            outline: "none",
            boxShadow: "0 2px 8px var(--shadow)",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={selectStyle}
            >
              <option value="">Género</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              style={selectStyle}
            >
              <option value="">Artista</option>
              {artists.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Precio min"
              style={selectStyle}
              min={0}
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Precio max"
              style={selectStyle}
              min={0}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ ...selectStyle, minWidth: 160 }}
            >
              <option value="newest">Más nuevos</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
            <button
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
              }}
              onClick={() => {
                setGenre("");
                setArtist("");
                setMinPrice("");
                setMaxPrice("");
                setSearch("");
                setSort("newest");
              }}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Count */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 32,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: "var(--muted)",
            fontWeight: 500,
          }}
        >
          {mounted
            ? `${filtered.length} resultado${
                filtered.length === 1 ? "" : "s"
              }`
            : ""}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          justifyContent: "center",
          padding: "0 16px 32px",
          position: "relative",
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            className="onsale-card"
            onClick={() => router.push(`/albumdetails/${item.id}`)}
            style={{
              minWidth: 260,
              maxWidth: 340,
              width: "100%",
              flex: "1 1 320px",
              background: "var(--card)",
              borderRadius: 18,
              boxShadow: "var(--shadow)",
              textAlign: "left",
              position: "relative",
              transition:
                "transform 0.25s, box-shadow 0.25s, border 0.25s",
              border: "2px solid var(--border)",
              margin: "12px 0",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {item.badge && (
              <span
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  background:
                    "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                  color: "#222",
                  fontWeight: "bold",
                  borderRadius: 8,
                  padding: "4px 14px",
                  zIndex: 3,
                }}
              >
                {item.badge}
              </span>
            )}
            <div
              style={{
                width: "100%",
                height: 180,
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                zIndex: 2,
              }}
            >
              <img
                src={item.images?.[0] || ""}
                alt={item.title}
                className="onsale-main-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              />
            </div>
            <div
              style={{
                padding: "198px 18px 18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.18rem",
                  color: "var(--accent)",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                {item.artist}
              </div>
              <div
                style={{
                  fontSize: "0.98rem",
                  color: "var(--muted)",
                }}
              >
                {item.genero}
              </div>
              <div
                style={{
                  fontSize: "1.18rem",
                  color: "var(--accent)",
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                ${item.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .onsale-card { background: var(--card); border: 2px solid var(--border); box-shadow: var(--shadow); transition: transform 0.25s, box-shadow 0.25s, border 0.25s; position: relative; overflow: hidden; }
        .onsale-card:hover { transform: translateY(-8px) scale(1.04); box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important; border: 2px solid var(--accent) !important; }
        .dark .onsale-card:hover { transform: translateY(-8px) scale(1.04); box-shadow: 0 12px 36px #fff, 0 2px 12px #fff !important; border: 2px solid var(--accent) !important; }
        .onsale-main-img { width: 100% !important; height: 180px !important; object-fit: cover !important; }
        .onsale-main-img:hover { transform: scale(1.04); box-shadow: 0 4px 24px #fff; }
        @media (max-width:900px) { .onsale-card { min-width:70vw; max-width:80vw } }
        @media (max-width:600px) { .onsale-card { min-width:95vw; max-width:98vw; padding-bottom: 10px } }
      `}</style>
    </section>
  );
}

const selectStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  fontSize: "1rem",
  outline: "none",
  boxShadow: "0 2px 8px var(--shadow)",
  minWidth: 110,
  maxWidth: 180,
};