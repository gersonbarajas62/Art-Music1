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

  const baseClasses = [
    "flex items-center justify-between",
    "bg-sidebar dark:bg-sidebar",
    "text-default",
    "border-b border-border",
    "px-6 py-3",
    "transition-colors"
  ].join(" ");

  return (
<header className={`w-full ${baseClasses} ${className}`.trim()}>
      {/* Logo */}
      <h1 className="font-bold cursor-pointer" onClick={() => router.push('/')}>ART Music</h1>

      {/* Right controls: nav links + login + cart + theme toggle */}
      <div className="flex items-center space-x-4">
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <button
            onClick={() => router.push("/onsale")}
            className="hover:underline"
          >
            On Sale
          </button>
          <Link href="/genres" className="hover:underline">
            Genres
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center hover:underline"
            aria-label="Cart"
            type="button"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-button text-button-fg hover:bg-button-hover px-4 py-2 rounded font-medium"
          >
            Login
          </button>
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded hover:bg-pane transition"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-pane transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-sidebar dark:bg-sidebar flex flex-col items-start gap-4 p-4 border-b border-border">
          {['Home', 'On Sale', 'Genres'].map((label) => (
            <a
              key={label}
              href={label === 'Home' ? '/' : '#'}
              className="w-full hover:underline"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center hover:underline"
            aria-label="Cart"
            type="button"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-left bg-button text-button-fg hover:bg-button-hover px-4 py-2 rounded font-medium"
          >
            Login
          </button>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
