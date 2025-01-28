"use client";
import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Logo</h1>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="#" className="nav-link">On Sale</a>
        <a href="#" className="nav-link">Genres</a>
        <a href="#" className="nav-link cart">
          <ShoppingCart size={20} />
        </a>
        <button onClick={handleLoginRedirect} className="nav-link">
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
