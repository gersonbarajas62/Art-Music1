"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import GenresAndVinyls from "../../Components/GenresAndVinyls";
import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import Dashboard from "../../app/dashboard/dashboard";
import Link from "next/link";
import { cn } from "../../utils/cn";
import { LayoutDashboard, Disc, Settings, User, LogOut } from "lucide-react";

const menuItems = [
  {
    name: "Cuenta",
    icon: User,
    subMenu: [
      { name: "Resumen", href: "/account/overview" },
      { name: "Mis Pedidos", href: "/account/orders" },
    ],
  },
  {
    name: "Mis Productos",
    icon: Disc,
    subMenu: [
      { name: "Agregar Nuevo Disco", href: "/dashboard/add-products" },
      { name: "Ver Mis Discos", href: "/discos" },
    ],
  },
  {
    name: "Admin",
    icon: Settings,
    subMenu: [
      { name: "Usuarios", href: "/admin/users" },
      { name: "Cerrar Sesión", href: "/logout", icon: LogOut },
    ],
  },
];

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      return setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isLoginPage = pathname === "/login";
  const isDashboardPage = pathname.startsWith("/dashboard") || pathname.startsWith("/discos") || pathname.startsWith("/admin");

  if (!user && isDashboardPage) {
    return <p className="text-center text-white">Acceso denegado. Inicia sesión para continuar.</p>;
  }

  return (
    <>
      {!isLoginPage && !isDashboardPage && (
        <>
          <Header />
          <Hero />
          <Features />
          <GenresAndVinyls />
          <Contact />
          <Footer />
        </>
      )}
      {user && isDashboardPage ? (
        <div className="flex h-screen bg-gray-900 text-white">
          <aside
            className={cn(
              "h-full transition-all duration-300 ease-in-out bg-gray-800",
              isExpanded ? "w-56" : "w-16"
            )}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <nav className="flex flex-col h-full p-2">
              {menuItems.map((item) => (
                <div key={item.name} className="my-2">
                  <div
                    className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700"
                    onClick={() => toggleMenu(item.name)}
                  >
                    <item.icon className="w-6 h-6" />
                    {isExpanded && <span className="ml-3 text-sm">{item.name}</span>}
                  </div>
                  {isExpanded && activeMenu === item.name && item.subMenu && (
                    <div className="ml-8 mt-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block p-2 text-sm text-gray-300 rounded-lg hover:bg-gray-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
