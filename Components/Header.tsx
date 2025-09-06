// app/components/Header.tsx
"use client";
import React, { useState } from "react";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "../app/context/ThemeProvider";
import CartDrawer from "./CartDrawer";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <header
      className={`w-full ${className} header-main`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--section)",
        boxShadow: "0 2px 8px var(--shadow)",
        borderBottom: "1px solid var(--border)",
        padding: 0,
      }}
    >
      <div
        className="header-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
          minHeight: "64px",
        }}
      >
        {/* Logo */}
        <h1
          className="font-bold cursor-pointer header-logo"
          style={{
            fontSize: "2rem",
            color: "var(--accent)",
            letterSpacing: "1px",
            fontWeight: "bold",
            textShadow: "0 2px 8px var(--bg)",
            margin: 0,
            transition: "font-size 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={() => router.push("/")}
        >
          {/* If you want to use an image logo, add it here */}
          {/* <img src="/logo.png" alt="ART Music" className="header-logo-img" /> */}
          ART Music
        </h1>

        {/* Desktop nav */}
        <nav
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontWeight: 500,
            fontSize: "1.15rem",
            marginLeft: "auto",
          }}
        >
          <Link href="/" className="hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            Home
          </Link>
          <Link href="/onsale" className="hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            On Sale
          </Link>
          <Link href="/genres" className="hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            Genres
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center hover:underline"
            aria-label="Cart"
            type="button"
            style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "1.25rem" }}
          >
            <ShoppingCart size={24} />
          </button>
          <Link
            href="/login"
            className="login-btn"
          >
            Login
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded hover:bg-pane transition"
            style={{
              background: "none",
              border: "none",
              marginLeft: "8px",
              color: "var(--accent)",
            }}
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>

        {/* Mobile menu toggle (hamburger) */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            marginLeft: "12px",
            fontSize: "2rem",
            display: "none",
          }}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile nav (only visible on small screens) */}
      {menuOpen && (
        <nav
          className="nav-mobile"
          style={{
            background: "var(--section)",
            boxShadow: "0 2px 8px var(--shadow)",
            borderBottom: "1px solid var(--border)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            padding: "18px 24px",
          }}
        >
          <Link href="/" className="w-full hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            Home
          </Link>
          <Link href="/onsale" className="w-full hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            On Sale
          </Link>
          <Link href="/genres" className="w-full hover:underline" style={{ color: "var(--text)", fontWeight: 600 }}>
            Genres
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center hover:underline"
            aria-label="Cart"
            type="button"
            style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "1.25rem" }}
          >
            <ShoppingCart size={24} />
          </button>
          <Link
            href="/login"
            className="w-full text-left bg-button text-button-fg hover:bg-button-hover px-4 py-2 rounded font-medium"
            style={{
              background: "var(--accent)",
              color: "var(--bg)", // Fix: use var(--bg) for dark background, not #000
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.08rem",
              boxShadow: "var(--shadow)",
              marginTop: "8px",
              textDecoration: "none",
              border: "none",
            }}
          >
            Login
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded hover:bg-pane transition"
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              marginTop: "8px",
            }}
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>
        {`
          .header-main {
            width: 100%;
          }
          .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 32px;
            min-height: 64px;
          }
          .header-logo {
            font-size: 2rem;
            color: var(--accent);
            letter-spacing: 1px;
            font-weight: bold;
            text-shadow: 0 2px 8px var(--bg);
            margin: 0;
            transition: font-size 0.2s;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .nav-desktop {
            display: flex;
            align-items: center;
            gap: 32px;
            font-weight: 500;
            font-size: 1.15rem;
            marginLeft: "auto",
          }
          .login-btn {
            background: #0e639c !important;
            color: #fff !important;
            border-radius: 6px !important;
            font-weight: bold !important;
            font-size: 1.08rem !important;
            box-shadow: var(--shadow) !important;
            margin-left: 8px !important;
            text-decoration: none !important;
            border: none !important;
            padding: 8px 24px !important;
            transition: background 0.2s, color 0.2s !important;
            display: inline-block !important;
          }
          .login-btn:hover {
            background: #1177bb !important;
            color: #fff !important;
            filter: brightness(0.95);
          }
          @media (max-width: 1200px) {
            .header-container {
              padding: 0 16px !important;
              min-height: 54px !important;
            }
            .header-logo {
              font-size: 1.5rem !important;
              letter-spacing: 0.5px !important;
            }
            .nav-desktop {
              gap: 18px !important;
              font-size: 1rem !important;
            }
            .login-btn {
              font-size: 1rem !important;
              padding: 7px 18px !important;
            }
          }
          @media (max-width: 900px) {
            .header-container {
              padding: 0 8px !important;
              min-height: 44px !important;
            }
            .header-logo {
              font-size: 1.15rem !important;
              letter-spacing: 0.2px !important;
            }
            .nav-desktop {
              gap: 10px !important;
              font-size: 0.98rem !important;
              display: none !important;
            }
            .login-btn {
              font-size: 0.98rem !important;
              padding: 6px 12px !important;
              margin-left: 4px !important;
            }
            .nav-mobile-toggle {
              display: block !important;
            }
          }
          @media (max-width: 600px) {
            .header-container {
              padding: 0 4px !important;
              min-height: 38px !important;
            }
            .header-logo {
              font-size: 0.95rem !important;
              letter-spacing: 0.1px !important;
            }
            .nav-desktop {
              gap: 6px !important;
              font-size: 0.92rem !important;
            }
            .login-btn {
              font-size: 0.92rem !important;
              padding: 5px 8px !important;
              margin-left: 2px !important;
            }
          }
          /* Responsive image/logo if you use an <img> for logo */
          .header-logo-img {
            max-width: 120px;
            height: auto;
          }
          @media (max-width: 900px) {
            .header-logo-img {
              max-width: 80px !important;
            }
          }
          @media (max-width: 600px) {
            .header-logo-img {
              max-width: 54px !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
