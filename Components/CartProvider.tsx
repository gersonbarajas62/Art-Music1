import React, { createContext, useState } from "react";

export const CartContext = createContext<any>({
  cart: [],
  addToCart: (item: any) => {},
  updateQuantity: (id: any, delta: number) => {},
  removeFromCart: (id: any) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        // If already in cart, increase quantity
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p
        );
      }
      // If not in cart, add with quantity 1
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const updateQuantity = (id: any, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: any) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
