// app/components/Header.tsx
"use client";
import React, { useEffect, useState } from "react";
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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`w-full ${className}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--section)",
        boxShadow: "0 2px 8px var(--shadow)",
        borderBottom: "1px solid var(--border)",
        padding: "0",
      }}
    >
      <div
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
          className="font-bold cursor-pointer"
          style={{
            fontSize: "2rem",
            color: "var(--accent)",
            letterSpacing: "1px",
            fontWeight: "bold",
            textShadow: "0 2px 8px var(--bg)",
            margin: 0,
          }}
          onClick={() => router.push("/")}
        >
          ART Music
        </h1>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontWeight: 500,
            fontSize: "1.15rem",
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
            className="bg-button text-button-fg hover:bg-button-hover px-4 py-2 rounded font-medium"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.08rem",
              boxShadow: "var(--shadow)",
              marginLeft: "8px",
              textDecoration: "none",
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
              marginLeft: "8px",
              color: "var(--accent)",
            }}
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-pane transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--accent)",
            marginLeft: "12px",
            fontSize: "2rem",
          }}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="absolute top-full left-0 w-full flex flex-col items-start gap-4 p-4 border-b border-border"
          style={{
            background: "var(--section)",
            boxShadow: "0 2px 8px var(--shadow)",
            borderBottom: "1px solid var(--border)",
            zIndex: 99,
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
              color: "var(--bg)",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.08rem",
              boxShadow: "var(--shadow)",
              marginTop: "8px",
              textDecoration: "none",
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
    </header>
  );
};

export default Header;
