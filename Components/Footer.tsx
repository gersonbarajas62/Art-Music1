"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <footer
      style={{
        backgroundColor: "var(--section)",
        color: "var(--text)",
        paddingTop: "2.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderTop: "1px solid var(--border)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {/* Logo and Description */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.7rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "var(--accent)",
              letterSpacing: "1px",
              textShadow: isDark
                ? "0 0 8px var(--accent)"
                : "2px 2px 0 var(--card), 0 0 8px var(--accent)",
            }}
          >
            Artmusic
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: "340px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Tu destino para los mejores vinilos y rock. Explora géneros, descubre
            música y encuentra tu próximo disco favorito.
          </p>
        </div>

        {/* Newsletter */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
            marginBottom: "1.5rem",
            width: "100%",
            maxWidth: 340,
          }}
          aria-label="Suscríbete al boletín"
        >
          <label
            htmlFor="newsletter"
            style={{ fontWeight: 600, color: "var(--accent)" }}
          >
            Suscríbete y recibe novedades
          </label>
          <div style={{ display: "flex", width: "100%" }}>
            <input
              id="newsletter"
              type="email"
              placeholder="Tu correo electrónico"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px 0 0 8px",
                border: "1px solid var(--border)",
                outline: "none",
                fontSize: "1rem",
                background: isDark ? "var(--card)" : "#f7f7f7",
                color: "var(--text)",
              }}
              required
            />
            <button
              type="submit"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "0 8px 8px 0",
                padding: "10px 18px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
              aria-label="Suscribirse"
            >
              Suscribirse
            </button>
          </div>
        </form>

        {/* Navigation Links */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
          aria-label="Enlaces de navegación"
        >
          <Link href="/" style={navLinkStyle(isDark)}>
            Inicio
          </Link>
          <Link href="/genres" style={navLinkStyle(isDark)}>
            Géneros
          </Link>
          <Link href="/vinyls" style={navLinkStyle(isDark)}>
            Vinilos
          </Link>
          <Link href="/contact" style={navLinkStyle(isDark)}>
            Contacto
          </Link>
        </nav>

        {/* Social Media Icons & Contact */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2.2rem",
              marginBottom: "0.5rem",
            }}
          >
            {/* Facebook */}
            <a
              href="https://facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
            >
              <svg
                width="28"
                height="28"
                fill="#1877F3"
                viewBox="0 0 24 24"
                style={{
                  filter: isDark ? "" : "drop-shadow(1px 1px 0 var(--card))",
                }}
              >
                <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                style={{
                  filter: isDark ? "" : "drop-shadow(1px 1px 0 var(--card))",
                }}
              >
                <radialGradient id="insta-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="100%" stopColor="#962fbf" />
                </radialGradient>
                <rect
                  width="24"
                  height="24"
                  rx="6"
                  fill="url(#insta-gradient)"
                />
                <path
                  fill="#fff"
                  d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.2-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"
                />
              </svg>
            </a>
            {/* Mercado Libre */}
            <a
              href="https://www.mercadolibre.com.mx/perfil/MARCOSRUBIO"
              aria-label="Mercado Libre"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: isDark ? "" : "drop-shadow(1px 1px 0 var(--card))",
                  background: "transparent",
                  borderRadius: "50%",
                }}
              >
                <ellipse cx="20" cy="20" rx="20" ry="20" fill="#ffe600" />
                {/* Handshake */}
                <g>
                  <path
                    d="M13.5 20.5c2.5 2.5 10.5 2.5 13 0"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M15.5 18.5c1.5 1.5 7.5 1.5 9 0"
                    stroke="#333"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <ellipse cx="20" cy="20" rx="13" ry="7" fill="none" stroke="#333" strokeWidth="1.2"/>
                  {/* Hands */}
                  <path
                    d="M13.5 20.5c-1-1 2-3 3-2"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M26.5 20.5c1-1-2-3-3-2"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </svg>
            </a>
          </div>
          <div
            style={{
              color: "var(--accent)",
              fontSize: "1.05rem",
            }}
          >
            <span style={{ marginRight: 12 }}>
              <b>Email:</b>{" "}
              <a
                href="mailto:info@artmusic.com"
                style={{ color: "var(--accent)" }}
              >
                info@artmusic.com
              </a>
            </span>
            <span>
              <b>WhatsApp:</b>{" "}
              <a
                href="https://wa.me/5215555555555"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                +52 1 555 555 5555
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
          marginTop: "2rem",
          fontSize: "0.9rem",
          color: "var(--muted)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p>© 2025 ART Music. Todos los derechos reservados.</p>
        <p>
          Hecho con pasión por la música.{" "}
          <Link
            href="/privacy"
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
          >
            Política de privacidad
          </Link>{" "}
          |{" "}
          <Link
            href="/terms"
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
          >
            Términos de servicio
          </Link>
        </p>
      </div>
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            background: "var(--accent)",
            color: "var(--bg)",
            padding: 0,
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "transform 0.3s, background 0.2s",
            width: 54,
            height: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {/* Vinyl Record with Up Arrow */}
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="var(--bg)" stroke="var(--text)" strokeWidth="2"/>
            <circle cx="16" cy="16" r="7" fill="none" stroke="var(--accent)" strokeWidth="2"/>
            <circle cx="16" cy="16" r="2.2" fill="var(--accent)" stroke="var(--text)" strokeWidth="1"/>
            {/* Up Arrow */}
            <path d="M16 10 L16 20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13 13 L16 10 L19 13" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </button>
      )}
      <style>
        {`
          .footer-link:focus {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
          }
          a[aria-label]:hover, a[aria-label]:focus {
            transform: scale(1.12);
          }
          @media (max-width: 700px) {
            footer > div {
              gap: 1.5rem !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

// Helper styles
function navLinkStyle(isDark: boolean) {
  return {
    fontSize: "1rem",
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
    padding: "2px 8px",
    borderRadius: "6px",
    outline: "none",
  } as React.CSSProperties;
}
const iconLinkStyle: React.CSSProperties = {
  transition: "transform 0.2s",
  display: "inline-flex",
  alignItems: "center",
};

export default Footer;
