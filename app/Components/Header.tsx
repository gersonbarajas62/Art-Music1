"use client"; // Add this directive at the top

import React from "react";

const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <h1>Logo</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">On Sale</a>
        <a href="#" className="nav-link">Contact Us</a>
      </nav>

      {/* Right Section: Buttons */}
      <div className="actions">
        <button className="action-button">Log In</button>
        <button className="action-button contact">Contact</button>
        <button className="action-button signup">Sign Up</button>
      </div>

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
        }

        .logo h1 {
          font-size: 24px;
          font-weight: bold;
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
        }

        .nav-link:hover {
          color: #FFD700;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .action-button {
          background: transparent;
          color: #fff;
          border: 1px solid #fff;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s, color 0.3s;
        }

        .action-button:hover {
          background-color: #fff;
          color: #000;
        }

        .action-button.contact {
          background-color: #333;
          border-color: #333;
        }

        .action-button.contact:hover {
          background-color: #FFD700;
          color: #000;
        }

        .action-button.signup {
          background-color: #FFD700;
          color: #000;
          border: none;
        }

        .action-button.signup:hover {
          background-color: #f7c600;
        }
      `}</style>
    </header>
  );
};

export default Header;
