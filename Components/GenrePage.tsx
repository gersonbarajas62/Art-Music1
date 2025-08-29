"use client";
import React from "react";

const genreVinyls: Record<string, { title: string; price: string; image: string; bestSeller?: boolean; limited?: boolean; sale?: boolean }[]> = {
  metal: [
    { title: 'Metallica: Master of Puppets', price: '$39.99', image: '/images/metallica.jpg', bestSeller: true },
    { title: 'Iron Maiden: Powerslave', price: '$36.99', image: '/images/maiden.jpg', limited: true },
  ],
  thrash: [
    { title: 'Slayer: Reign in Blood', price: '$34.99', image: '/images/slayer.jpg', sale: true },
    { title: 'Megadeth: Rust in Peace', price: '$32.99', image: '/images/megadeth.jpg' },
  ],
  progressive: [
    { title: 'Dream Theater: Images and Words', price: '$44.99', image: '/images/dream-theater.jpg', bestSeller: true },
    { title: 'Rush: Moving Pictures', price: '$38.99', image: '/images/rush.jpg' },
  ],
  "classic-rock": [
    { title: 'Led Zeppelin IV', price: '$41.99', image: '/images/ledzep.jpg', limited: true },
    { title: 'The Beatles: Abbey Road', price: '$49.99', image: '/images/beatles.jpg', bestSeller: true },
  ],
  jazz: [
    { title: 'Miles Davis: Kind of Blue', price: '$29.99', image: '/images/miles.jpg', sale: true },
    { title: 'John Coltrane: Blue Train', price: '$27.99', image: '/images/coltrane.jpg' },
  ],
};

const GenrePage = ({ genre }: { genre: string }) => {
  const vinyls = genreVinyls[genre] || [];
  const genreTitle = genre.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <section style={{ padding: '32px 0', backgroundColor: '#121212', color: '#fff', minHeight: 500 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '28px', color: '#FFD700', fontWeight: 'bold' }}>
        {genreTitle}
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
        {vinyls.map((vinyl) => (
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
                  background: '#FFD700',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  transition: 'background 0.2s',
                }}
                onClick={() => alert('Agregado al carrito (demo)')}
              >
                Agregar al carrito
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
    </section>
  );
};

export default GenrePage;