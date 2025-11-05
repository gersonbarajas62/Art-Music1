"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
    link: "/catalogo",
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

// Modified hook: add 'enabled' param. When enabled is false (SSR / initial render),
// return full text immediately so server HTML matches client initial HTML.
const useTypingEffect = (text: string, speed = 60, enabled = true) => {
	// If not enabled, show full text (server + initial client render) and mark done.
	const initial = enabled ? "" : text;
	const [displayed, setDisplayed] = useState(initial);
	const [done, setDone] = useState(!enabled);
	const idxRef = useRef(0);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		// If typing is disabled, don't start any timers.
		if (!enabled) {
			// ensure displayed and done reflect disabled state
			setDisplayed(text);
			setDone(true);
			return;
		}

		idxRef.current = 0;
		setDisplayed("");
		setDone(false);

		const step = () => {
			const i = idxRef.current;
			if (i < text.length) {
				setDisplayed(text.slice(0, i + 1));
				idxRef.current = i + 1;
				timerRef.current = window.setTimeout(step, speed);
			} else {
				setDone(true);
				timerRef.current = null;
			}
		};

		timerRef.current = window.setTimeout(step, speed);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [text, speed, enabled]);

	return { displayed, done };
};

// requestAnimationFrame-throttled scroll Y hook
const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return scrollY;
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  // Call hook unconditionally but typing only starts when mounted === true.
  const { displayed, done } = useTypingEffect(HEADLINE_TEXT, 50, mounted);

  const [showParagraph, setShowParagraph] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const scrollY = useScrollY();
  const paraTimerRef = useRef<number | null>(null);
  const btnTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // mark mounted on client only — used to avoid SSR/CSR style differences
    setMounted(true);
  }, []);

  useEffect(() => {
    if (done) {
      paraTimerRef.current = window.setTimeout(() => setShowParagraph(true), 300);
      btnTimerRef.current = window.setTimeout(() => setShowButtons(true), 900);
    }
    return () => {
      if (paraTimerRef.current) { clearTimeout(paraTimerRef.current); paraTimerRef.current = null; }
      if (btnTimerRef.current) { clearTimeout(btnTimerRef.current); btnTimerRef.current = null; }
    };
  }, [done]);

  // Build base section style (stable on server). Add backgroundPosition only after mount.
  const sectionStyle = useMemo<React.CSSProperties>(() => {
    const base: React.CSSProperties = {
      position: "relative",
      backgroundColor: "var(--vsc-bg)",
      color: "var(--vsc-foreground)",
      padding: "50px 20px",
      backgroundImage: "url('/images/hero-background.jpg')",
      backgroundSize: "cover",
      textAlign: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "background-position 0.2s",
    };
    if (mounted) {
      // apply parallax only on client after mount to avoid SSR/CSR mismatch
      return { ...base, backgroundPosition: `center ${scrollY * 0.2}px` };
    }
    return base;
  }, [mounted, scrollY]);

  const heroContentStyle = useMemo<React.CSSProperties>(
      () => ({ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }),
      []
    );

  return (
    <section id="hero" style={sectionStyle}>
      <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />
      <div className="hero-content" style={heroContentStyle}>
        {/* H1 initially rendered as full static text on server / initial client render.
            Typing animation begins only after mounted becomes true (client-only). */}
        <h1
          className="hero-title"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            textShadow: "2px 2px 12px rgba(0,0,0,0.28)",
            whiteSpace: "pre",
            opacity: displayed ? 1 : 0,
            transition: "opacity 0.25s ease",
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

        <p
          className="hero-desc"
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            lineHeight: "1.5",
            textShadow: "1px 1px 12px rgba(0,0,0,0.18)",
            opacity: showParagraph ? 1 : 0,
            transform: showParagraph ? "none" : "translateX(-12px)",
            transition: "opacity 0.5s, transform 0.5s",
          }}
        >
          {PARAGRAPH_TEXT}
        </p>

        <div
          className="hero-btn-row"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "none" : "translateX(12px)",
            transition: "opacity 0.5s, transform 0.5s",
            flexWrap: "wrap",
          }}
        >
          {BUTTONS.map((btn) =>
            btn.isLink ? (
              <Link
                key={btn.label}
                href={btn.link}
                className="hero-btn"
                style={{
                  ...commonButtonStyle,
                  ...btn.style,
                }}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, btn.hover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, btn.style)}
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
                onMouseOver={(e) => Object.assign(e.currentTarget.style, btn.hover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, btn.style)}
              >
                {btn.label}
              </a>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .hero-overlay { background: rgba(255,255,255,0.48); transition: background 240ms ease; }
        .dark .hero-overlay { background: rgba(0,0,0,0); }

        .hero-content{ width:100%; max-width:800px; margin:0 auto; padding:0 24px; }
        .hero-title{ color:#111; font-size:3rem; }
        .hero-desc{ color:#222; font-size:1.2rem; }

        .dark .hero-title, .dark .hero-desc { color: var(--text); text-shadow: 2px 2px 8px rgba(0,0,0,0.6); }

        .hero-btn{ padding:12px 24px; font-size:1rem; font-weight:bold; border-radius:5px; cursor:pointer; margin-right:10px; box-shadow:2px 4px 6px rgba(0,0,0,0.4); transition: transform .3s, background-color .3s, color .3s; text-decoration:none; display:inline-block; min-width:180px; text-align:center; }

        @media (max-width:900px) {
          .hero-title{ font-size:2rem !important; }
          .hero-desc{ font-size:1.05rem !important; margin-bottom:18px !important; }
        }
        @media (max-width:600px) {
          .hero-title{ font-size:1.15rem !important; }
          .hero-desc{ font-size:0.92rem !important; margin-bottom:10px !important; }
        }
      `}</style>
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
