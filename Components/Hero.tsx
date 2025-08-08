"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const headlineText = "El hogar del rock raro";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(headlineText.slice(0, i + 1));
      i++;
      if (i === headlineText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Overlay color based on theme
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const overlayColor = isDark
    ? "rgba(0,0,0,0.65)"
    : "rgba(255,255,255,0.45)";

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        padding: "50px 20px",
        backgroundImage: "url('/images/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: `center ${scrollY * 0.2}px`, // Parallax effect
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        transition: "background-position 0.2s",
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayColor,
          zIndex: 1,
          transition: "background 0.3s",
        }}
      />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Typing headline */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            background: "linear-gradient(90deg, #FFD700 30%, #fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            whiteSpace: "pre",
            opacity: displayedText ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {displayedText}
          <span
            className="blinking-cursor"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "3rem",
              marginLeft: "2px",
              animation: "blink 1s step-end infinite",
              visibility: typingDone ? "hidden" : "visible",
            }}
          >
            |
          </span>
        </h1>
        {/* Side fade-in paragraph */}
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            lineHeight: "1.5",
            color: "#FFD700",
            textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
            opacity: typingDone ? 1 : 0,
            animation:
              typingDone
                ? "fadeInLeft 1.2s cubic-bezier(.77,0,.175,1) forwards"
                : "none",
            transition: "opacity 0.5s",
          }}
        >
          CDs y vinilos que no encontrarás en otro lugar. Somos tu lugar
          indicado para tus compras de discos y vinilos raros, importados de
          Japón y Europa. Discos nuevos y usados para coleccionistas con una
          pasión única por la música.
        </p>
        {/* Side fade-in buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            opacity: typingDone ? 1 : 0,
            animation:
              typingDone
                ? "fadeInRight 1.2s 0.5s cubic-bezier(.77,0,.175,1) forwards"
                : "none",
            transition: "opacity 0.5s",
          }}
        >
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "var(--vsc-bg)",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f7c600")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFD700")
            }
          >
            Explorar Catálogo
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#FFD700",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, color 0.3s, background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#FFD700";
              e.currentTarget.style.color = "var(--vsc-bg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FFD700";
            }}
          >
            Más Información
          </button>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-60px);}
            to { opacity: 1; transform: translateX(0);}
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(60px);}
            to { opacity: 1; transform: translateX(0);}
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

const Hero = () => (
  <section
    style={{
      background: "var(--section)",
      color: "var(--text)",
      borderRadius: "20px",
      margin: "48px auto 40px",
      maxWidth: "1200px",
      padding: "64px 0 56px",
      boxShadow: "var(--shadow)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <h1
      style={{
        fontSize: "2.8rem",
        fontWeight: "bold",
        marginBottom: "1.2rem",
        color: "var(--text)",
        textShadow: "0 2px 8px var(--bg)",
        letterSpacing: "1.5px",
      }}
    >
      Bienvenido a Artmusic
    </h1>
    <p
      style={{
        color: "var(--muted)",
        fontSize: "1.3rem",
        marginBottom: "2.2rem",
        fontWeight: 500,
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Tu destino para vinilos y coleccionables legendarios.
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
      <Link
        href="/genres"
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          borderRadius: "10px",
          padding: "16px 40px",
          fontWeight: "bold",
          fontSize: "1.15rem",
          textDecoration: "none",
          boxShadow: "var(--shadow)",
          transition: "background 0.2s, color 0.2s, transform 0.2s",
          display: "inline-block",
        }}
      >
        Explorar catálogo
      </Link>
      <a
        href="#about"
        style={{
          background: "transparent",
          color: "var(--accent)",
          border: "2px solid var(--accent)",
          borderRadius: "10px",
          padding: "16px 40px",
          fontWeight: "bold",
          fontSize: "1.15rem",
          textDecoration: "none",
          boxShadow: "var(--shadow)",
          transition: "background 0.2s, color 0.2s, transform 0.2s",
          display: "inline-block",
        }}
      >
        Más información
      </a>
    </div>
  </section>
);

export default HeroSection;
