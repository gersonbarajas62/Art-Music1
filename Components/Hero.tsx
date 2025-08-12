"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const HEADLINE_TEXT = "El hogar del rock raro";
const PARAGRAPH_TEXT =
  "CDs y vinilos que no encontrarás en otro lugar. Somos tu lugar indicado para tus compras de discos y vinilos raros, importados de Japón y Europa. Discos nuevos y usados para coleccionistas con una pasión única por la música.";

const BUTTONS = [
  {
    label: "Explorar Catálogo",
    style: {
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
      border: "none",
    },
    hover: {
      backgroundColor: "var(--text)",
      color: "var(--bg)",
    },
    link: "/genres",
    isLink: true,
  },
  {
    label: "Más Información",
    style: {
      backgroundColor: "transparent",
      color: "var(--accent)",
      border: "2px solid var(--accent)",
    },
    hover: {
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
    },
    link: "#about",
    isLink: false,
  },
];

const useTypingEffect = (text: string, speed = 60) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
};

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

const getOverlayColor = () => {
  if (typeof window === "undefined") return "rgba(255,255,255,0.45)";
  return document.documentElement.classList.contains("dark")
    ? "rgba(0,0,0,0.65)"
    : "rgba(255,255,255,0.45)";
};

const HeroSection = () => {
  const { displayed, done } = useTypingEffect(HEADLINE_TEXT);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const scrollY = useScrollY();
  const overlayColor = getOverlayColor();

  useEffect(() => {
    if (done) {
      const paraTimer = setTimeout(() => setShowParagraph(true), 400); // after headline
      const btnTimer = setTimeout(() => setShowButtons(true), 1200); // after paragraph
      return () => {
        clearTimeout(paraTimer);
        clearTimeout(btnTimer);
      };
    }
  }, [done]);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        padding: "50px 20px",
        backgroundImage: "url('/images/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: `center ${scrollY * 0.2}px`,
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
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            color: "var(--text)",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            whiteSpace: "pre",
            opacity: displayed ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {displayed}
          <span
            className="blinking-cursor"
            style={{
              color: "var(--accent)",
              fontWeight: "bold",
              fontSize: "3rem",
              marginLeft: "2px",
              animation: "blink 1s step-end infinite",
              visibility: done ? "hidden" : "visible",
            }}
          >
            |
          </span>
        </h1>
        {showParagraph && (
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              lineHeight: "1.5",
              color: "var(--muted)",
              textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
              opacity: done ? 1 : 0,
              animation: done
                ? "fadeInLeft 1.2s cubic-bezier(.77,0,.175,1) forwards"
                : "none",
              transition: "opacity 0.5s",
            }}
          >
            {PARAGRAPH_TEXT}
          </p>
        )}
        {showButtons && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              opacity: showButtons ? 1 : 0,
              animation: "fadeInRight 1.2s cubic-bezier(.77,0,.175,1) forwards",
              transition: "opacity 0.5s",
            }}
          >
            {BUTTONS.map((btn, idx) =>
              btn.isLink ? (
                <Link
                  key={btn.label}
                  href={btn.link}
                  style={{
                    ...commonButtonStyle,
                    ...btn.style,
                  }}
                  onMouseOver={e => {
                    Object.assign(e.currentTarget.style, btn.hover);
                  }}
                  onMouseOut={e => {
                    Object.assign(e.currentTarget.style, btn.style);
                  }}
                >
                  {btn.label}
                </Link>
              ) : (
                <a
                  key={btn.label}
                  href={btn.link}
                  style={{
                    ...commonButtonStyle,
                    ...btn.style,
                  }}
                  onMouseOver={e => {
                    Object.assign(e.currentTarget.style, btn.hover);
                  }}
                  onMouseOut={e => {
                    Object.assign(e.currentTarget.style, btn.style);
                  }}
                >
                  {btn.label}
                </a>
              )
            )}
          </div>
        )}
      </div>
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

const commonButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
  boxShadow: "2px 4px 6px rgba(0,0,0,0.4)",
  transition: "transform 0.3s, background-color 0.3s, color 0.3s",
  textDecoration: "none",
  display: "inline-block",
};

export default HeroSection;
