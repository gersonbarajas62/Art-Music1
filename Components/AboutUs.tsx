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
      scrollMarginTop: 100,
    }}
  >
    <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: 18, color: "var(--accent)" }}>
      Sobre el dueño
    </h2>
    <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: 24 }}>
      ¡Hola! Soy <b>Marcos Rubio</b>, tengo 29 años y soy originario de Neza, la ciudad del rock en la CDMX. Mi pasión por la música y los vinilos nació gracias a mi padre, quien fundó nuestra tienda familiar en Plaza Cuauhtémoc hace más de 10 años. Desde pequeño, él me enseñó el valor de cada disco y el arte de conectar a las personas con la música que aman.
    </p>
    <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: 24 }}>
      He viajado por más de 10 países buscando ediciones raras, discos únicos y tesoros musicales, especialmente de <b>The Beatles</b>, mi banda favorita y la razón por la que nació mi amor por este negocio. Cada pieza que encuentras aquí tiene una historia y está seleccionada con amor y dedicación.
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
      <span role="img" aria-label="medal">🏅</span> Más de <b>1000 ventas</b> en Mercado Libre<br />
      <span role="img" aria-label="star">⭐</span> 100% calificaciones positivas<br />
      <span role="img" aria-label="handshake">🤝</span> Atención personalizada y asesoría para coleccionistas<br />
      <span role="img" aria-label="rocket">🚀</span> Envíos rápidos y seguros a todo México
      <br />
      <a
        href="https://www.mercadolibre.com.mx/perfil/MARCOSRUBIO"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: 14,
          color: "var(--accent)",
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: "1.05rem"
        }}
      >
        Ver mi reputación en Mercado Libre →
      </a>
    </div>
    <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>
      En Artmusic, cada cliente es parte de la familia. Si buscas algo especial, ¡ven a la tienda o escríbeme! Gracias por confiar en nosotros para encontrar tu próximo tesoro musical.
    </p>
    <div style={{ marginTop: 18, color: "var(--accent)", fontWeight: "bold", fontSize: "1.08rem" }}>
      <span role="img" aria-label="location">📍</span> Local familiar en Plaza Cuauhtémoc, CDMX — ¡Visítanos y vive la experiencia Artmusic!
    </div>
  </section>
);

export default AboutUs;