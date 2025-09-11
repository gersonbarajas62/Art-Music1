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
    link: "/catalogo", // <-- Change from "/genres" to "/catalogo"
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
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

const useIsDark = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);
  return isDark;
};

const getOverlayColor = (isDark: boolean) => {
  return isDark ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.65)";
};

const HeroSection = () => {
  const { displayed, done } = useTypingEffect(HEADLINE_TEXT);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const scrollY = useScrollY();
  const isDark = useIsDark();
  const overlayColor = getOverlayColor(isDark);

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
        className="hero-content"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          className="hero-title"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            color: isDark ? "var(--text)" : "#111",
            textShadow: isDark ? "2px 2px 8px rgba(0,0,0,0.7)" : "2px 2px 12px rgba(0,0,0,0.28)",
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
            className="hero-desc"
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              lineHeight: "1.5",
              color: isDark ? "var(--muted)" : "#222",
              textShadow: isDark ? "1px 1px 6px rgba(0,0,0,0.6)" : "1px 1px 12px rgba(0,0,0,0.18)",
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
            className="hero-btn-row"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              opacity: showButtons ? 1 : 0,
              animation: "fadeInRight 1.2s cubic-bezier(.77,0,.175,1) forwards",
              transition: "opacity 0.5s",
              flexWrap: "wrap",
            }}
          >
            {BUTTONS.map((btn, idx) =>
              btn.isLink ? (
                <Link
                  key={btn.label}
                  href={btn.link}
                  className="hero-btn"
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
                  className="hero-btn"
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
          .hero-content {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-desc {
            font-size: 1.2rem;
          }
          .hero-btn-row {
            gap: 20px;
            flex-wrap: wrap;
          }
          .hero-btn {
            padding: 12px 24px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
            box-shadow: 2px 4px 6px rgba(0,0,0,0.4);
            transition: transform 0.3s, background-color 0.3s, color 0.3s;
            text-decoration: none;
            display: inline-block;
            min-width: 180px;
            text-align: center;
          }
          @media (max-width: 900px) {
            .hero-content {
              padding: 0 8vw !important;
            }
            .hero-title {
              font-size: 2rem !important;
            }
            .hero-desc {
              font-size: 1.05rem !important;
              margin-bottom: 18px !important;
            }
            .hero-btn {
              font-size: 0.98rem !important;
              min-width: 140px !important;
              padding: 10px 18px !important;
            }
          }
          @media (max-width: 600px) {
            .hero-content {
              padding: 0 2vw !important;
            }
            .hero-title {
              font-size: 1.15rem !important;
              margin-bottom: 10px !important;
            }
            .hero-desc {
              font-size: 0.92rem !important;
              margin-bottom: 10px !important;
            }
            .hero-btn-row {
              gap: 10px !important;
            }
            .hero-btn {
              font-size: 0.92rem !important;
              min-width: 100px !important;
              padding: 8px 10px !important;
            }
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
