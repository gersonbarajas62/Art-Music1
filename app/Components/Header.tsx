"use client";

import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react"; // Icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <h1>Logo</h1>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#" className="nav-link">
          Home
        </a>
        <a href="#" className="nav-link">
          On Sale
        </a>
        <a href="#" className="nav-link">
          Genres
        </a>
        <a href="#" className="nav-link cart">
          <ShoppingCart size={20} />
        </a>
      </nav>

      {/* Styling */}
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #000;
          color: #fff;
          font-family: Arial, sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo h1 {
          font-size: 24px;
          font-weight: bold;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .nav {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }

        .nav-link.cart {
          padding: 5px;
          background-color: #333;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s, color 0.3s;
        }

        .nav-link.cart:hover {
          background-color: #FFD700;
          color: #000;
        }

        .nav-link:hover {
          color: #FFD700;
        }

        /* Mobile Menu Styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav {
            position: absolute;
            top: 60px;
            right: 0;
            background-color: #000;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 20px;
            width: 200px;
            border: 1px solid #222;
            transform: translateX(100%);
            transition: transform 0.3s;
            opacity: 0;
          }

          .nav.open {
            transform: translateX(0);
            opacity: 1;
          }

          .nav-link {
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
