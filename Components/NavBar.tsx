"use client"; // Add this to make it a Client Component

import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Navigation Links */}
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
        {/* Logo Image */}
        <Link href="/">
          <Image 
            src="" // Adjust the file name and path if necessary
            alt="Art Music Logo" 
            width={120} // Specify width
            height={60} // Specify height
            priority // Optional: Optimize for loading
          />
        </Link>
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

        .nav-right img {
          display: block;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
