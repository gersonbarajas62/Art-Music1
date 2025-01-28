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
    <header className="header flex justify-between items-center bg-gray-900 p-4 text-white">
      {/* Logo */}
      <div className="logo text-xl font-bold cursor-pointer">
        <h1>ART Music</h1>
      </div>

      {/* Hamburger Menu */}
      <button
        className="menu-toggle md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`nav ${
          menuOpen ? "flex" : "hidden"
        } flex-col md:flex-row md:items-center gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:flex`}
      >
        <a href="/" className="nav-link hover:underline">
          Home
        </a>
        <a href="#" className="nav-link hover:underline">
          On Sale
        </a>
        <a href="#" className="nav-link hover:underline">
          Genres
        </a>
        <a href="#" className="nav-link cart hover:underline flex items-center">
          <ShoppingCart size={20} />
        </a>
        <button
          onClick={handleLoginRedirect}
          className="nav-link hover:underline bg-yellow-500 px-4 py-2 rounded text-gray-900 font-medium"
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
