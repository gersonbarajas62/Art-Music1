const HeroSection = () => {
    return (
      <section style={{ 
        backgroundColor: '#000', 
        color: '#fff', 
        padding: '50px 20px', 
        backgroundImage: "url('/images/hero-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Rare Vinyls and CDs from Japan & Europe
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', lineHeight: '1.5' }}>
            Explore exclusive collections of rock music and subgenres, featuring rare and unique pieces
            from iconic bands like The Beatles and more. Find collectibles you won't see anywhere else.
          </p>
          <button style={{ 
            backgroundColor: '#FFD700', 
            color: '#000', 
            padding: '10px 20px', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}>
            Shop Now
          </button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;