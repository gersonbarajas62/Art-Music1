"use client"; //  Add this to make it a Client Component

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Updated Links */}
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/shop" className="nav-link">
          Shop
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
      </div>
      <div className="nav-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 200"
          role="img"
          aria-labelledby="title"
          className="logo-svg"
        >
          <title id="title">Art Music Logo</title>
          <rect width="500" height="200" fill="white" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="48"
            fill="#FFD700"
            fontWeight="bold"
          >
            Art <tspan fill="#87CEEB">Music</tspan>
          </text>
          <circle cx="430" cy="100" r="30" fill="none" stroke="#87CEEB" strokeWidth="5" />
          <path
            d="M430 70 Q440 80, 430 90 Q420 100, 430 110 Q440 120, 430 130"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
          />
        </svg>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #1a1a1a;
        }

        .nav-left {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        .nav-right {
          display: flex;
          align-items: center;
        }

        .logo-svg {
          width: 120px;
          height: auto;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;

