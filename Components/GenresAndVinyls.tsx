import React, { useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getProductsWithImages } from "../utils/supabaseProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageWithLoader from "./ImageWithLoader";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const GenresAndVinyls = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    getProductsWithImages().then(setProducts);
  }, []);

  // Get all unique genres from products
  const genres = Array.from(new Set(products.map(p => p.genero).filter(Boolean))).map(genre => ({
    name: genre,
    image: products.find(p => p.genero === genre)?.images?.[0] || "/images/default-genre.jpg"
  }));

  // Hot New Vinyls: vinilNuevo === true && vinilosenVista === true
  const hotVinyls = products.filter(p => p.vinilNuevo === true && p.vinilosenVista === true);

  // Staff Picks: eleccion === true
  const staffPicks = products.filter(p => p.eleccion === true);

  const staffSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    // force slide sizing to match our card widths; fewer slides on smaller screens
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, arrows: true } },
      { breakpoint: 900, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 600, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

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
                  boxShadow: "var(--shadow)",
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  height: "180px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="genre-card"
              >
                <div style={{ width: "100%", height: "120px", overflow: "hidden", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", position: "relative", margin: 0, padding: 0, zIndex: 1 }}>
                  <ImageWithLoader src={genre.image} alt={genre.name} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ textAlign: "center", padding: "14px 0 0 0", width: "100%", zIndex: 2 }}>
                  <h3 style={{ margin: 0, color: "var(--accent)", fontWeight: 700, fontSize: "1.08rem" }}>{genre.name}</h3>
                </div>
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
                boxShadow: "var(--shadow)",
                minWidth: 180,
                maxWidth: 220,
                flex: "1 1 200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                overflow: "hidden",
                height: "220px",
                justifyContent: "flex-start",
              }}
              className="hot-vinyl-card"
              onClick={() => router.push(`/albumdetails/${vinyl.id}`)}
            >
              {vinyl.badge && (
                <span style={{
                  position: 'absolute', top: 10, left: 10,
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: 'bold',
                  borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem', zIndex: 2
                }}>{vinyl.badge}</span>
              )}
              <div style={{ width: "100%", height: "120px", overflow: "hidden", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", position: "relative", margin: 0, padding: 0, zIndex: 1 }}>
                <ImageWithLoader src={vinyl.image} alt={vinyl.title} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: "center", padding: "14px 0 0 0", width: "100%", zIndex: 2 }}>
                <h3 style={{ margin: 0, color: "var(--accent)", fontWeight: 700, fontSize: "1.08rem" }}>{vinyl.title}</h3>
                <div style={{ color: "var(--muted)", fontWeight: 500, fontSize: "0.98rem" }}>{vinyl.artist}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Ver más button under Hot New Vinyls */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/hot-vinyls">
            <button
              className="gnv-btn"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "10px",
                padding: "14px 38px",
                fontWeight: "bold",
                fontSize: "1.12rem",
                border: "none",
                boxShadow: "0 2px 12px var(--shadow)",
                cursor: "pointer",
                margin: "0 auto",
                letterSpacing: "1px",
                transition: "background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s",
                display: "inline-block",
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
        {/* increased minHeight + vertical padding so cards do not clip top/bottom */}
        <div style={{ maxWidth: 900, margin: '0 auto 36px', padding: '0 12px', minHeight: 420 }}>
          {/* padded wrapper keeps arrows inside viewport and gives slides breathing room (vertical padding added) */}
          <div className="staff-slider-wrap" style={{ padding: "20px 40px" }}>
            <Slider {...staffSettings}>
              {staffPicks.map((pick) => (
                <div key={pick.id}>
                  <div
                    style={{
                      background: "var(--card)",
                      borderRadius: "10px",
                      boxShadow: "var(--shadow)",
                      flex: "0 0 200px",      // fixed smaller slide width
                      width: 200,
                      margin: "0 6px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      transition: "transform 0.18s, box-shadow 0.18s",
                      cursor: "pointer",
                      overflow: "hidden",
                      height: "240px",       // reduced height so cards fit wrapper
                      justifyContent: "flex-start",
                      boxSizing: "border-box",
                    }}
                    className="staff-pick-card"
                    onClick={() => router.push(`/albumdetails/${pick.id}`)}
                  >
                    <div style={{ width: "100%", height: "120px", overflow: "hidden", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", position: "relative", margin: 0, padding: 0, zIndex: 1 }}>
                      <ImageWithLoader src={pick.image} alt={pick.title} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </div>
                    <div style={{ textAlign: "center", padding: "12px 8px 0 8px", width: "100%", zIndex: 2 }}>
                      <h3 style={{ margin: 0, color: "var(--accent)", fontWeight: 700, fontSize: "1rem", lineHeight: "1.2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pick.title}</h3>
                      <div style={{ color: "var(--muted)", fontWeight: 500, fontSize: "0.9rem", marginTop: 6 }}>{pick.artist}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
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
          <Link href="/catalogo" style={{ color: "var(--bg)", textDecoration: 'underline', fontWeight: 'bold' }}>
            <button
              className="gnv-btn"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "10px",
                padding: "14px 38px",
                fontWeight: "bold",
                fontSize: "1.12rem",
                border: "none",
                boxShadow: "0 2px 12px var(--shadow)",
                cursor: "pointer",
                margin: "0 0 0 12px",
                letterSpacing: "1px",
                transition: "background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s",
                display: "inline-block",
              }}
            >
              Explora todo nuestro catálogo y ofertas →
            </button>
          </Link>
        </div>
        <style>
          {`
            .genre-card:hover {
              transform: scale(1.04);
              box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            }
           /* staff picks slider wrapper: prevent mobile clipping and position arrows inside */
           .staff-slider-wrap { padding: 20px 40px; }
            /* defensive: ensure slick dots are hidden for this specific wrapper */
            .staff-slider-wrap .slick-dots { display: none !important; }
            .staff-slider-wrap .slick-prev, .staff-slider-wrap .slick-next {
              z-index: 20;
              top: 50% !important;
              transform: translateY(-50%) !important;
            }
            .staff-slider-wrap .slick-prev { left: 12px !important; }
            .staff-slider-wrap .slick-next { right: 12px !important; }
             .hot-vinyl-card:hover, .staff-pick-card:hover {
                transform: scale(1.045);
                box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
                border: 2px solid var(--accent);
              }
            @media (max-width: 900px) {
              .staff-slider-wrap { padding: 12px 16px; }
              .staff-pick-card { margin: 0 auto !important; height: 220px !important; flex: 0 0 180px !important; width: 180px !important; }
              .staff-pick-card > div:first-child { height: 110px !important; } /* image area */
            }
            @media (max-width: 600px) {
              .staff-slider-wrap { padding: 10px 12px; }
              .staff-pick-card { margin: 0 auto !important; height: 200px !important; flex: 0 0 160px !important; width: 160px !important; }
              .staff-pick-card > div:first-child { height: 96px !important; } /* image area */
            }
            .gnv-btn {
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
            .gnv-btn:hover {
              box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
              transform: translateY(-4px) scale(1.04);
              background: var(--accent);
              color: var(--bg);
            }
          `}
        </style>
      </section>
    </>
  );
};

export default GenresAndVinyls;
