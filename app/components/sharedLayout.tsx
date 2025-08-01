"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import GenresAndVinyls from "../../Components/GenresAndVinyls";
import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import Link from "next/link";
// … your menuItems, cn util, etc …

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const isLogin = pathname === "/login";
  const isDashboard = ["/dashboard", "/discos", "/admin"].some(p => pathname.startsWith(p));

  if (!user && isDashboard) {
    return (
      <div className="flex items-center justify-center h-screen bg-sidebar text-default">
        Acceso denegado. Inicia sesión para continuar.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isLogin && <Header className="sticky top-0 z-50" />}

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Landing page sections */}
        {!isLogin && !isDashboard && (
          <>
            <Hero />
            <Features />
            <GenresAndVinyls />
            <Contact />
          </>
        )}

        {/* Dashboard layout */}
        {user && isDashboard && (
          <div className="flex h-full">
            {/* … your aside/nav … */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        )}

        {/* Other pages (children) */}
        {!isDashboard && <main>{children}</main>}
      </div>

      {/* Footer appears only on landing pages */}
      {!isLogin && !isDashboard && <Footer />}
    </div>
  );
}
