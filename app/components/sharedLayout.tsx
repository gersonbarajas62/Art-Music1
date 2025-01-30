"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import GenresAndVinyls from "../../Components/GenresAndVinyls";
import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render shared components for non-dashboard and non-login pages */}
      {!isLoginPage && !isDashboardPage && (
        <>
          <header>
            <Header />
          </header>
          <Hero />
          <Features />
          <GenresAndVinyls />
          <Contact />
        </>
      )}

      {/* Main content */}
      <main className={`flex-1 container mx-auto p-4 ${isDashboardPage ? "bg-gray-100" : ""}`}>
        {children}
      </main>

      {/* Footer */}
      {!isDashboardPage && (
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} ART Music</p>
        </footer>
      )}
    </div>
  );
};

export default SharedLayout;
