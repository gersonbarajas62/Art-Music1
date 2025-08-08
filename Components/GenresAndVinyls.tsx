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
    <section style={{ padding: '32px 0', backgroundColor: '#121212', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '28px', color: '#FFD700', fontWeight: 'bold' }}>
        Explora por Género
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
          padding: '0 24px',
        }}
      >
        {genres.map((genre) => (
          <Link
            key={genre.name}
            href={`/genres/${genre.name.toLowerCase().replace(/\s/g, '-')}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '10px',
                padding: '14px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
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
              <h3 style={{ margin: '0', color: '#FFD700', fontWeight: 600 }}>{genre.name}</h3>
              <span style={{ fontSize: '0.95rem', color: '#bbb' }}>Ver discos</span>
            </div>
          </Link>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', margin: '40px 0 20px', color: '#FFD700', fontWeight: 'bold' }}>
        Hot New Vinyls
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
          padding: '0 24px',
        }}
      >
        {hotVinyls.map((vinyl) => (
          <div
            key={vinyl.title}
            style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            {vinyl.bestSeller && (
              <span style={{
                position: 'absolute', top: 10, left: 10,
                background: '#FFD700', color: '#000', fontWeight: 'bold',
                borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
              }}>Best Seller</span>
            )}
            {vinyl.limited && (
              <span style={{
                position: 'absolute', top: 10, right: 10,
                background: '#e67e22', color: '#fff', fontWeight: 'bold',
                borderRadius: '6px', padding: '2px 10px', fontSize: '0.85rem'
              }}>Limited</span>
            )}
            {vinyl.sale && (
              <span style={{
                position: 'absolute', bottom: 10, left: 10,
                background: '#e74c3c', color: '#fff', fontWeight: 'bold',
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
            <h3 style={{ margin: '10px 0 4px', color: '#FFD700', fontWeight: 600 }}>{vinyl.title}</h3>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{vinyl.price}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button
                style={{
                  background: cart.includes(vinyl.title) ? '#bbb' : '#FFD700',
                  color: '#000',
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
              <button
                style={{
                  background: 'transparent',
                  color: '#FFD700',
                  border: '1px solid #FFD700',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => alert('Ver detalles (demo)')}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Picks Carousel */}
      <h2 style={{ textAlign: 'center', margin: '40px 0 20px', color: '#FFD700', fontWeight: 'bold' }}>
        Staff Picks
      </h2>
      <div style={{ maxWidth: 600, margin: '0 auto 36px' }}>
        <Slider {...staffSettings}>
          {staffPicks.map((pick) => (
            <div key={pick.title}>
              <div
                style={{
                  backgroundColor: '#232323',
                  borderRadius: '10px',
                  padding: '14px',
                  textAlign: 'center',
                  minWidth: '180px',
                  maxWidth: '220px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  margin: '0 auto',
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
                <h3 style={{ margin: '10px 0 4px', color: '#FFD700', fontWeight: 600 }}>{pick.title}</h3>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{pick.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Call to Action */}
      <div
        style={{
          background: 'linear-gradient(90deg, #FFD700 0%, #e67e22 100%)',
          color: '#222',
          borderRadius: '12px',
          padding: '28px 18px',
          textAlign: 'center',
          maxWidth: 600,
          margin: '0 auto',
          fontWeight: 'bold',
          fontSize: '1.15rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        }}
      >
        ¿Buscas más?{" "}
        <Link href="/onsale" style={{ color: '#000', textDecoration: 'underline', fontWeight: 'bold' }}>
          Explora todo nuestro catálogo y ofertas →
        </Link>
      </div>
    </section>
  );
};

export default GenresAndVinyls;
