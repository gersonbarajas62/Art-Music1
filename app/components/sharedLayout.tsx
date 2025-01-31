// Updated sidebar in sharedLayout.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { 
  LayoutDashboard, 
  Disc, 
  Settings, 
  User, 
  LogOut, 
  CreditCard, 
  ShoppingBag 
} from "lucide-react";

const menuItems = [
  {
    name: "Account",
    icon: User,
    subMenu: [
      { name: "Overview", href: "/account/overview" },
      { name: "My Orders", href: "/account/orders" },
      { name: "Payments", href: "/account/payments" },
    ],
  },
  {
    name: "Mis Productos",
    icon: Disc,
    subMenu: [
      { name: "Agregar Nuevo Disco", href: "/dashboard" },
      { name: "Ver Mis Discos", href: "/discos" },
    ],
  },
  {
    name: "Admin",
    icon: Settings,
    subMenu: [
      { name: "Manage Users", href: "/admin/users" },
      { name: "Logout", href: "/logout", icon: LogOut },
    ],
  },
];

import { ReactNode } from "react";

export default function SharedLayout({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
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
  );
}
