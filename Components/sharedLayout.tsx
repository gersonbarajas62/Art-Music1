/*"use client"; // Mark as client component

import { usePathname } from "next/navigation";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import GenresAndVinyls from "./GenresAndVinyls";
import Contact from "./Contact";
import Footer from "./Footer";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <>
          <Header />
          <Hero />
          <Features />
          <GenresAndVinyls />
          <Contact />
          <Footer />
        </>
      )}
      <main>{children}</main>
    </>
  );
}*/
