"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import GenresAndVinyls from "../../Components/GenresAndVinyls";
import Contact from "../../Components/ContactUs";
import Footer from "../../Components/Footer";
import Link from "next/link";
import BeatlesShowcase from "../../Components/BeatlesShowcase";
import AboutUs from "../../Components/AboutUs";
import { CartProvider } from "../../Components/CartProvider";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<any | null>(null);

  // useEffect(() => onAuthStateChanged(auth, setUser), []);

  const isLogin = pathname === "/login";
  const isDashboard = ["/dashboard", "/discos", "/admin"].some(p => pathname.startsWith(p));
  const isHome = pathname === "/";

  // if (!user && isDashboard) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-sidebar text-default">
  //       Acceso denegado. Inicia sesión para continuar.
  //     </div>
  //   );
  // }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {!isLogin && <Header className="sticky top-0 z-50" />}

        <div className="flex-1 overflow-y-auto">
          {/* Only render landing sections on home page */}
          {isHome ? (
            <>
              <Hero />
              <BeatlesShowcase />
              <Features />
              <GenresAndVinyls />
              <Contact />
              <AboutUs />
            </>
          ) : isDashboard && user ? (
            <div className="flex h-full">
              {/* … your aside/nav … */}
              <main className="flex-1 p-6">{children}</main>
            </div>
          ) : (
            <main>{children}</main>
          )}
        </div>

        {/* Footer only on home page */}
        {isHome && <Footer />}
      </div>
    </CartProvider>
  );
}
