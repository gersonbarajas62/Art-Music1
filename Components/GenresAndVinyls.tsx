import React, { useState } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const genres = [
  { name: 'Metal', image: '/images/metal.jpg' },
  { name: 'Thrash', image: '/images/thrash.jpg' },
  { name: 'Progressive', image: '/images/progressive.jpg' },
  { name: 'Classic Rock', image: '/images/classic-rock.jpg' },
  { name: 'Jazz', image: '/images/jazz.jpg' },
];

const hotVinyls = [
  { title: 'Caspian: On Circles', price: '$35.98', image: '/images/caspian.jpg', bestSeller: true },
  { title: 'John Legend: Get Lifted', price: '$41.98', image: '/images/john-legend.jpg', limited: true },
  { title: 'Babyface Ray: The Kid That Did', price: '$34.98', image: '/images/babyface-ray.jpg' },
  { title: 'Peter Tosh: Mystic Man', price: '$24.98', image: '/images/peter-tosh.jpg', sale: true },
  { title: 'Rush: Signals', price: '$29.98', image: '/images/rush.jpg' },
  { title: 'Dream Theater: Awake', price: '$44.98', image: '/images/dream-theater.jpg', bestSeller: true },
];

const staffPicks = [
  { title: 'Queen: Greatest Hits', price: '$39.99', image: '/images/queen.jpg' },
  { title: 'Pink Floyd: The Wall', price: '$49.99', image: '/images/pink-floyd.jpg' },
  { title: 'Miles Davis: Kind of Blue', price: '$29.99', image: '/images/miles.jpg' },
  { title: 'Led Zeppelin IV', price: '$41.99', image: '/images/ledzep.jpg' },
];

const GenresAndVinyls = () => {
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (title: string) => {
    setCart((prev) => [...prev, title]);
    // You can show a toast or feedback here
  };

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

  return (
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
            key={vinyl.title}
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
            }}
          >
            {vinyl.bestSeller && (
              <span style={{
                position: 'absolute', top: 10, left: 10,
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: 'bold',
                borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
              }}>Best Seller</span>
            )}
            {vinyl.limited && (
              <span style={{
                position: 'absolute', top: 10, right: 10,
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: 'bold',
                borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
              }}>Limited</span>
            )}
            {vinyl.sale && (
              <span style={{
                position: 'absolute', bottom: 10, left: 10,
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: 'bold',
                borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
              }}>SALE</span>
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
              <button
                style={{
                  background: cart.includes(vinyl.title) ? 'var(--muted)' : 'var(--accent)',
                  color: "var(--bg)",
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontWeight: 'bold',
                  cursor: cart.includes(vinyl.title) ? 'not-allowed' : 'pointer',
                  fontSize: '0.98rem',
                  transition: 'background 0.2s',
                }}
                disabled={cart.includes(vinyl.title)}
                onClick={() => handleAddToCart(vinyl.title)}
              >
                {cart.includes(vinyl.title) ? "Agregado" : "Agregar al carrito"}
              </button>
              <Link
                href={`/albumdetails?id=${encodeURIComponent(vinyl.title)}`}
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
            <div key={pick.title}>
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
                }}
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
          @media (max-width: 900px) {
            .genre-card, .hot-vinyl-card {
              min-width: 45vw !important;
              max-width: 48vw !important;
            }
          }
          @media (max-width: 600px) {
            .genre-card, .hot-vinyl-card {
              min-width: 90vw !important;
              max-width: 95vw !important;
              padding: 14px 6px 18px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default GenresAndVinyls;
