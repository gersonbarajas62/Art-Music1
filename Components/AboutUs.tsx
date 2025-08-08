const AboutUs = () => (
  <section
    id="about"
    style={{
      background: "var(--section)",
      color: "var(--text)",
      borderRadius: "20px",
      margin: "48px auto 40px",
      maxWidth: "900px",
      padding: "48px 24px",
      boxShadow: "var(--shadow)",
      textAlign: "center",
      scrollMarginTop: 100, // for smooth scroll offset
    }}
  >
    <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: 18 }}>
      Sobre el dueño
    </h2>
    <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: 24 }}>
      Soy Juan Pérez, fundador de Artmusic y apasionado coleccionista de vinilos. Desde hace más de 15 años viajo por el mundo en busca de ediciones raras y piezas únicas, especialmente de <b>The Beatles</b>, mi banda favorita.
    </p>
    <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: 24 }}>
      He recorrido ferias y tiendas en Inglaterra, Alemania, Estados Unidos y Japón, siempre buscando lo mejor para mis clientes. Mi pasión es compartir la música y la historia detrás de cada disco.
    </p>
    <div style={{
      background: "var(--card)",
      borderRadius: 14,
      boxShadow: "var(--shadow)",
      padding: 24,
      margin: "32px auto",
      maxWidth: 500,
      color: "var(--text)",
      border: "1px solid var(--border)",
      fontWeight: "bold",
      fontSize: "1.1rem"
    }}>
      <span role="img" aria-label="medal">🏅</span> Más de <b>1200 ventas</b> en Mercado Libre<br />
      <span role="img" aria-label="star">⭐</span> 100% calificaciones positivas<br />
      <span role="img" aria-label="handshake">🤝</span> Confianza y atención personalizada garantizadas
    </div>
    <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
      En Artmusic, cada cliente es parte de la familia. ¡Gracias por confiar en mí para encontrar tu próximo tesoro musical!
    </p>
  </section>
);

export default AboutUs;