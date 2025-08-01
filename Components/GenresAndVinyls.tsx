import React from 'react';

const genres = [
  { name: 'Metal', image: '/images/rolling-stones.jpg' },
  { name: 'Thrash', image: '/images/rolling-stones.jpg' },
  { name: 'Progressive', image: '/images/rolling-stones.jpg' },
  { name: 'Classic Rock', image: '/images/rolling-stones.jpg' },
  { name: 'Jazz', image: '/images/rolling-stones.jpg' },
];

const vinyls = [
  { title: 'Caspian: On Circles', price: '$35.98', image: '/images/beatles-vinyl.jpg' },
  { title: 'John Legend: Get Lifted', price: '$41.98', image: '/images/beatles-vinyl.jpg' },
  { title: 'Babyface Ray: The Kid That Did', price: '$34.98', image: '/images/beatles-vinyl.jpg' },
  { title: 'Peter Tosh: Mystic Man', price: '$24.98', image: '/images/beatles-vinyl.jpg' },
];

const GenresAndVinyls = () => {
  return (
    <section style={{ padding: '20px', backgroundColor: '#121212', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Explore by Genre</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {genres.map((genre) => (
          <div
            key={genre.name}
            style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={genre.image}
              alt={genre.name}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h3 style={{ margin: '10px 0' }}>{genre.name}</h3>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: 'center', margin: '40px 0 20px' }}>Hot New Vinyls</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {vinyls.map((vinyl) => (
          <div
            key={vinyl.title}
            style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={vinyl.image}
              alt={vinyl.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h3 style={{ margin: '10px 0' }}>{vinyl.title}</h3>
            <p>{vinyl.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenresAndVinyls;
