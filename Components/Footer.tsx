"use client";

const Footer = () => {
  // Detect theme
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <footer
      style={{
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        paddingTop: "2.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderTop: "1px solid #333",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "768px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Logo and Description */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#FFD700",
              textShadow: !isDark
                ? "2px 2px 0 #000, 0 0 8px #FFD700"
                : "0 0 8px #FFD700",
            }}
          >
            Artmusic
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: isDark ? "#bbb" : "#444",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            Your destination for the best rock and vinyl records. Explore genres,
            discover music, and find your next favorite record.
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {["Home", "Genres", "Vinyls", "Contact"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: "0.95rem",
                color: isDark ? "#fff" : "#222",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = isDark ? "#fff" : "#222")
              }
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            padding: "0.5rem 0",
            marginBottom: "2rem",
          }}
        >
          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            style={{ transition: "transform 0.2s" }}
          >
            <svg
              width="28"
              height="28"
              fill="#1877F3"
              viewBox="0 0 24 24"
              style={{
                filter: isDark ? "" : "drop-shadow(1px 1px 0 #000)",
              }}
            >
              <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.326V1.326C24 .595 23.405 0 22.675 0" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            style={{ transition: "transform 0.2s" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              style={{
                filter: isDark ? "" : "drop-shadow(1px 1px 0 #000)",
              }}
            >
              <radialGradient id="insta-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#feda75" />
                <stop offset="50%" stopColor="#d62976" />
                <stop offset="100%" stopColor="#962fbf" />
              </radialGradient>
              <rect width="24" height="24" rx="6" fill="url(#insta-gradient)" />
              <path
                fill="#fff"
                d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.2-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"
              />
            </svg>
          </a>
          {/* Mercado Libre */}
          <a
            href="#"
            aria-label="Mercado Libre"
            style={{ transition: "transform 0.2s" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              style={{
                filter: isDark ? "" : "drop-shadow(1px 1px 0 #000)",
              }}
            >
              <ellipse cx="16" cy="16" rx="16" ry="16" fill="#ffe600" />
              <path
                d="M24.5 13.5c-1.2-1.2-3.2-2.5-8.5-2.5s-7.3 1.3-8.5 2.5c-.3.3-.3.7 0 1 .3.3.7.3 1 0 1-1 2.8-2.1 7.5-2.1s6.5 1.1 7.5 2.1c.3.3.7.3 1 0 .3-.3.3-.7 0-1z"
                fill="#fff"
              />
              <path
                d="M16 17.5c-2.8 0-5.2-.7-6.7-1.8-.3-.2-.7-.2-.9.1-.2.3-.2.7.1.9 1.7 1.2 4.3 2 7.5 2s5.8-.8 7.5-2c.3-.2.3-.6.1-.9-.2-.3-.6-.3-.9-.1-1.5 1.1-3.9 1.8-6.7 1.8z"
                fill="#fff"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          borderTop: "1px solid #333",
          paddingTop: "1rem",
          marginTop: "2rem",
          fontSize: "0.85rem",
          color: isDark ? "#bbb" : "#444",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p>© 2025 ART Music. All rights reserved.</p>
        <p>
          Built with passion for music.{" "}
          <a
            href="#"
            style={{
              color: "#6c63ff",
              textDecoration: "underline",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="#"
            style={{
              color: "#6c63ff",
              textDecoration: "underline",
              fontWeight: "bold",
              transition: "color 0.3s",
            }}
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
