"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const mockCart = [
  {
    id: 1,
    name: "Vinilo: Pink Floyd – The Wall",
    price: 1200,
    image: "/images/pinkfloyd.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "CD: Led Zeppelin – IV",
    price: 450,
    image: "/images/ledzep.jpg",
    quantity: 2,
  },
];

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const [cart, setCart] = useState(mockCart);
  const router = useRouter();

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const handleQuantity = (id: number, delta: number) => {
    setCart(cart =>
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-420px",
        width: "360px",
        height: "100vh",
        background: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        boxShadow: "-2px 0 24px rgba(0,0,0,0.25)",
        transition: "right 0.35s cubic-bezier(.77,0,.175,1)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "22px 24px 10px 24px",
          borderBottom: "1px solid #FFD700",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDark ? "#181818" : "#fffbe6",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#FFD700" }}>
          Tu carrito
        </span>
        <button
          aria-label="Cerrar"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.6rem",
            color: "#FFD700",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>
      </div>
      {/* Cart Items */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "60px", color: "#FFD700" }}>
            El carrito está vacío.
          </div>
        ) : (
          cart.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                background: isDark ? "#232323" : "#fff",
                borderRadius: "12px",
                boxShadow: isDark
                  ? "0 2px 8px rgba(0,0,0,0.45)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
                padding: "10px",
                gap: "14px",
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #FFD700",
                  background: "#fff",
                }}
              />
              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#FFD700",
                    textShadow: !isDark
                      ? "1px 1px 0 #000, 0 0 6px #FFD700"
                      : "0 0 6px #FFD700",
                    marginBottom: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={item.name}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: "0.95rem", color: isDark ? "#eee" : "#222" }}>
                  ${item.price} x {item.quantity}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 8 }}>
                  <button
                    onClick={() => handleQuantity(item.id, -1)}
                    style={{
                      background: "#FFD700",
                      border: "none",
                      color: "#000",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      transition: "background 0.2s",
                    }}
                  >-</button>
                  <span style={{ minWidth: 18, textAlign: "center" }}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity(item.id, 1)}
                    style={{
                      background: "#FFD700",
                      border: "none",
                      color: "#000",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      transition: "background 0.2s",
                    }}
                  >+</button>
                  <button
                    aria-label="Eliminar"
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f44336",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      marginLeft: 8,
                    }}
                  >🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Total & Checkout */}
      <div
        style={{
          borderTop: "1px solid #FFD700",
          padding: "18px 24px",
          background: isDark ? "#181818" : "#fffbe6",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#FFD700",
          fontSize: "1.1rem",
        }}>
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button
          style={{
            width: "100%",
            padding: "13px",
            background: "#FFD700",
            color: "#000",
            border: "none",
            borderRadius: "7px",
            fontWeight: "bold",
            fontSize: "1.05rem",
            cursor: "pointer",
            letterSpacing: "1px",
            boxShadow: isDark
              ? "0 2px 8px rgba(0,0,0,0.5)"
              : "0 2px 8px rgba(0,0,0,0.09)",
            transition: "background 0.2s, transform 0.2s",
          }}
          onClick={() => {
            onClose(); // Optionally close the drawer
            router.push("/checkout");
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#e6c200")}
          onMouseOut={e => (e.currentTarget.style.background = "#FFD700")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;