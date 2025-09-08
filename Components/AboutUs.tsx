import React, { useState, useEffect } from "react";

const profiles = [
  {
    name: "Marcos Rubio",
    role: "Dueño / Owner",
    img: "/images/profile-marcos.jpg",
    bio: "¡Hola! Soy Marcos Rubio, tengo 29 años y soy originario de Neza, la ciudad del rock en la CDMX. Mi pasión por la música y los vinilos nació gracias a mi padre, quien fundó nuestra tienda familiar en Plaza Cuauhtémoc hace más de 10 años. Desde pequeño, él me enseñó el valor de cada disco y el arte de conectar a las personas con la música que aman.",
    facts: [
      "Más de 1000 ventas en Mercado Libre",
      "100% calificaciones positivas",
      "Atención personalizada y asesoría para coleccionistas",
      "Envíos rápidos y seguros a todo México"
    ],
    link: "https://www.mercadolibre.com.mx/perfil/MARCOSRUBIO",
    showLocation: true
  },
  {
    name: "Gerson (Desarrollador)",
    role: "Desarrollador / Developer",
    img: "/images/profile-dev.jpg",
    bio: "Soy Gerson, desarrollador web freelance. Ofrezco precios flexibles y soluciones personalizadas para tu negocio, tienda o proyecto. Si buscas una web moderna, rápida y optimizada, ¡contáctame!",
    facts: [
      "Especialista en UX/UI y desarrollo web",
      "Apasionado por la música y la tecnología",
      "Soporte técnico y mejoras continuas",
      "Precios flexibles y trato directo"
    ],
    link: "mailto:contacto.desarrollador.web@gmail.com",
    showLocation: false
  }
];

const AboutUs = () => {
  const [current, setCurrent] = useState(0);
  const profile = profiles[current];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((current + 1) % profiles.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
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
        position: "relative",
        overflow: "hidden",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
      }}
    >
      {/* Carousel indicator */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginBottom: 18 }}>
        {profiles.map((p, idx) => (
          <span key={p.name} style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: idx === current ? "var(--accent)" : "#ddd",
            display: "inline-block",
            transition: "background 0.3s"
          }} />
        ))}
      </div>
      {/* Profile image with fallback */}
      <div style={{
        width: 110,
        height: 110,
        borderRadius: "50%",
        background: "linear-gradient(90deg, var(--accent) 60%, #fffbe6 100%)",
        margin: "-12px auto 18px auto",
        boxShadow: "0 2px 12px var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "slideUp 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        overflow: "hidden"
      }}>
        <img src={profile.img} alt={profile.name} style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 8px #fff" }} onError={e => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name); }} />
      </div>
      <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: 18, color: "var(--accent)", letterSpacing: "1px", animation: "fadeIn 1.2s 0.2s" }}>
        {profile.name}
      </h2>
      <p style={{ fontSize: "1.18rem", color: "var(--text)", marginBottom: 24, fontWeight: "bold", animation: "fadeIn 1.2s 0.3s" }}>
        {profile.bio}
      </p>
      <div style={{
        background: "linear-gradient(90deg, var(--accent) 60%, #fffbe6 100%)",
        borderRadius: 14,
        boxShadow: "var(--shadow)",
        padding: 24,
        margin: "32px auto",
        maxWidth: 500,
        color: "#222",
        border: "1px solid var(--border)",
        fontWeight: "bold",
        fontSize: "1.1rem",
        animation: "slideUp 1.2s 0.5s",
      }}>
        {profile.facts.map((fact, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <span role="img" aria-label="star">⭐</span> {fact}
          </div>
        ))}
        <a
          href={profile.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 14,
            color: "var(--accent)",
            fontWeight: "bold",
            textDecoration: "underline",
            fontSize: "1.05rem",
            letterSpacing: "1px"
          }}
        >
          {profile.role === "Dueño / Owner" ? "Ver mi reputación en Mercado Libre →" : "Contactar al desarrollador →"}
        </a>
      </div>
      {profile.showLocation && (
        <div style={{ marginTop: 18, color: "var(--accent)", fontWeight: "bold", fontSize: "1.08rem", animation: "fadeIn 1.2s 0.7s" }}>
          <span role="img" aria-label="location">📍</span> Local familiar en Plaza Cuauhtémoc, CDMX — ¡Visítanos y vive la experiencia Artmusic!
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @media (max-width: 900px) {
            section#about {
              max-width: 98vw !important;
              padding: 24px 2vw !important;
            }
          }
          @media (max-width: 600px) {
            section#about {
              max-width: 100vw !important;
              padding: 12px 1vw !important;
            }
            div[role="img"] {
              width: 70px !important;
              height: 70px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default AboutUs;