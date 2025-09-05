import React, { useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
import { getProductsWithImages } from "../utils/supabaseProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const GenresAndVinyls = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    getProductsWithImages().then(setProducts);
  }, []);

  // Get all unique genres from products
  const genres = Array.from(new Set(products.map(p => p.genero).filter(Boolean))).map(genre => ({
    name: genre,
    image: products.find(p => p.genero === genre)?.images?.[0] || "/images/default-genre.jpg"
  }));

  // Hot New Vinyls: vinilNuevo && vinilosenVista
  const hotVinyls = products.filter(p => p.vinilNuevo && p.vinilosenVista);

  // Staff Picks: eleccion
  const staffPicks = products.filter(p => p.eleccion);

  const staffSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 1 } },
    ],
  };

  // Make sure to return a single root element (wrap everything in a fragment if needed)
  return (
    <>
      <section
        style={{
          padding: '32px 0',
          background: "var(--section)",
          color: "var(--text)",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
          margin: "40px auto",
          maxWidth: "1100px",
          position: "relative",
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '28px',
          color: "var(--accent)",
          fontWeight: 'bold',
          fontSize: "2rem",
          letterSpacing: "1px",
        }}>
          Explora por Género
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '36px',
            padding: '0 24px',
            justifyContent: "center",
          }}
        >
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/genres/${genre.name.toLowerCase().replace(/\s/g, '-')}`}
              style={{ textDecoration: 'none', color: 'inherit', flex: "1 1 180px", maxWidth: 220, minWidth: 160 }}
            >
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: '10px',
                  padding: '14px',
                  textAlign: 'center',
                  boxShadow: "var(--shadow)",
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="genre-card"
              >
                <img
                  src={genre.image}
                  alt={genre.name}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '10px',
                  }}
                />
                <h3 style={{ margin: '0', color: "var(--accent)", fontWeight: 600 }}>{genre.name}</h3>
                <span style={{ fontSize: '0.95rem', color: "var(--muted)" }}>Ver discos</span>
              </div>
            </Link>
          ))}
        </div>

        <h2 style={{
          textAlign: 'center',
          margin: '40px 0 20px',
          color: "var(--accent)",
          fontWeight: 'bold',
          fontSize: "2rem",
          letterSpacing: "1px",
        }}>
          Hot New Vinyls
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '36px',
            padding: '0 24px',
            justifyContent: "center",
          }}
        >
          {hotVinyls.map((vinyl) => (
            <div
              key={vinyl.id}
              style={{
                background: "var(--card)",
                borderRadius: '10px',
                padding: '14px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: "var(--shadow)",
                minWidth: 180,
                maxWidth: 220,
                flex: "1 1 200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              className="hot-vinyl-card"
            >
              {vinyl.badge && (
                <span style={{
                  position: 'absolute', top: 10, left: 10,
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: 'bold',
                  borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
                }}>{vinyl.badge}</span>
              )}
              <img
                src={vinyl.image}
                alt={vinyl.title}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              />
              <h3 style={{ margin: '10px 0 4px', color: "var(--accent)", fontWeight: 600 }}>{vinyl.title}</h3>
              <p style={{ margin: 0, fontWeight: 'bold', color: "var(--text)" }}>{vinyl.price}</p>
              <div style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <Link
                  href={`/albumdetails/${vinyl.id}`}
                  style={{
                    background: 'transparent',
                    color: "var(--accent)",
                    border: '1px solid var(--accent)',
                    borderRadius: '6px',
                    padding: '7px 14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.98rem',
                    transition: 'background 0.2s, color 0.2s',
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Ver más button under Hot New Vinyls */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/hot-vinyls">
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
              Ver todos los Hot Vinyls &rarr;
            </button>
          </Link>
        </div>

        {/* Staff Picks Carousel */}
        <h2 style={{
          textAlign: 'center',
          margin: '40px 0 20px',
          color: "var(--accent)",
          fontWeight: 'bold',
          fontSize: "2rem",
          letterSpacing: "1px",
        }}>
          Staff Picks
        </h2>
        <div style={{ maxWidth: 600, margin: '0 auto 36px' }}>
          <Slider {...staffSettings}>
            {staffPicks.map((pick) => (
              <div key={pick.id}>
                <div
                  style={{
                    background: "var(--card)",
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center',
                    minWidth: '180px',
                    maxWidth: '220px',
                    boxShadow: "var(--shadow)",
                    margin: '0 auto',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  className="staff-pick-card"
                >
                  <img
                    src={pick.image}
                    alt={pick.title}
                    style={{
                      width: '100%',
                      height: '110px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '10px',
                    }}
                  />
                  <h3 style={{ margin: '10px 0 4px', color: "var(--accent)", fontWeight: 600 }}>{pick.title}</h3>
                  <p style={{ margin: 0, fontWeight: 'bold', color: "var(--text)" }}>{pick.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Call to Action */}
        <div
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            borderRadius: '12px',
            padding: '28px 18px',
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            boxShadow: "var(--shadow)",
          }}
        >
          ¿Buscas más?{" "}
          <Link href="/onsale" style={{ color: "var(--bg)", textDecoration: 'underline', fontWeight: 'bold' }}>
            Explora todo nuestro catálogo y ofertas →
          </Link>
        </div>
        <style>
          {`
            .genre-card:hover {
              transform: scale(1.04);
              box-shadow: 0 8px 32px var(--accent), 0 2px 12px var(--accent);
            }
            .hot-vinyl-card:hover {
              transform: scale(1.045);
              box-shadow: 0 8px 32px var(--accent), 0 2px 12px var(--accent);
              border: 2px solid var(--accent);
            }
            .staff-pick-card:hover {
              transform: scale(1.045);
              box-shadow: 0 8px 32px var(--accent), 0 2px 12px var(--accent);
            }
          `}
        </style>
      </section>
    </>
  );
};

export default GenresAndVinyls;
        