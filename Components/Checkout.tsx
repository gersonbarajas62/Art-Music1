"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm"; // If you split it, or just use the function directly

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

// CheckoutForm.tsx
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

const steps = ["Envío", "Pago", "Revisar"];

function CheckoutForm() {
  const [cart] = useState(mockCart);
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handlers
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  // Place order with Stripe
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // In production, fetch clientSecret from your backend
    // For demo, we'll just simulate success
    // const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { ... });

    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 1800);
  };

  // Stepper UI
  const Stepper = () => (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      marginBottom: "32px",
    }}>
      {steps.map((label, idx) => (
        <div key={label} style={{
          display: "flex",
          alignItems: "center",
          color: idx === step ? "#FFD700" : isDark ? "#bbb" : "#888",
          fontWeight: idx === step ? "bold" : "normal",
          fontSize: "1.05rem",
        }}>
          <span style={{
            display: "inline-block",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: idx <= step ? "#FFD700" : isDark ? "#232323" : "#eee",
            color: idx <= step ? "#000" : isDark ? "#bbb" : "#888",
            textAlign: "center",
            lineHeight: "22px",
            marginRight: 8,
            fontWeight: "bold",
            border: idx === step ? "2px solid #FFD700" : "2px solid #ccc",
            boxShadow: idx === step ? "0 0 8px #FFD700" : undefined,
            transition: "all 0.2s",
          }}>{idx + 1}</span>
          {label}
          {idx < steps.length - 1 && (
            <span style={{
              margin: "0 12px",
              color: "#FFD700",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}>→</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section
      style={{
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        padding: "48px 20px",
        borderRadius: "18px",
        margin: "40px auto",
        maxWidth: "900px",
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.8)"
          : "0 8px 24px rgba(0,0,0,0.13)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        position: "relative",
      }}
    >
      <Stepper />

      {orderPlaced ? (
        <div style={{
          textAlign: "center",
          color: "#FFD700",
          fontWeight: "bold",
          fontSize: "1.3rem",
          padding: "60px 0",
        }}>
          ¡Gracias por tu compra!<br />
          Te hemos enviado un correo con los detalles de tu pedido.
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "space-between",
        }}>
          {/* Cart Summary */}
          <div style={{ flex: "1 1 320px", minWidth: 280 }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#FFD700",
                marginBottom: "18px",
                textShadow: !isDark
                  ? "2px 2px 0 #000, 0 0 8px #FFD700"
                  : "0 0 8px #FFD700",
              }}
            >
              Resumen de tu compra
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: isDark ? "#232323" : "#fff",
                    borderRadius: "10px",
                    boxShadow: isDark
                      ? "0 2px 8px rgba(0,0,0,0.45)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    padding: "10px",
                    gap: "14px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "54px",
                      height: "54px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #FFD700",
                      background: "#fff",
                    }}
                  />
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
                  </div>
                  <div style={{ fontWeight: "bold", color: "#FFD700" }}>
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid #FFD700",
                marginTop: "22px",
                paddingTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#FFD700",
              }}
            >
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Step forms */}
          <div style={{
            flex: "1 1 320px",
            minWidth: 280,
            background: isDark ? "#181818" : "#fffbe6",
            borderRadius: "12px",
            boxShadow: isDark
              ? "0 2px 8px rgba(0,0,0,0.45)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            padding: "28px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}>
            {/* Shipping Step */}
            {step === 0 && (
              <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#FFD700",
                  marginBottom: "10px",
                  textShadow: !isDark
                    ? "1px 1px 0 #000, 0 0 6px #FFD700"
                    : "0 0 6px #FFD700",
                }}>
                  Dirección de envío
                </h3>
                <input
                  type="text"
                  name="name"
                  value={shipping.name}
                  onChange={handleShippingChange}
                  placeholder="Nombre completo"
                  required
                  style={inputStyle(isDark)}
                />
                <input
                  type="email"
                  name="email"
                  value={shipping.email}
                  onChange={handleShippingChange}
                  placeholder="Correo electrónico"
                  required
                  style={inputStyle(isDark)}
                />
                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  placeholder="Dirección"
                  required
                  style={inputStyle(isDark)}
                />
                <input
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="Ciudad"
                  required
                  style={inputStyle(isDark)}
                />
                <input
                  type="text"
                  name="postal"
                  value={shipping.postal}
                  onChange={handleShippingChange}
                  placeholder="Código postal"
                  required
                  style={inputStyle(isDark)}
                />
                <input
                  type="text"
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  placeholder="País"
                  required
                  style={inputStyle(isDark)}
                />
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="submit"
                    style={buttonStyle("#FFD700", "#000")}
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            )}

            {/* Payment Step */}
            {step === 1 && (
              <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#FFD700",
                  marginBottom: "10px",
                  textShadow: !isDark
                    ? "1px 1px 0 #000, 0 0 6px #FFD700"
                    : "0 0 6px #FFD700",
                }}>
                  Información de pago
                </h3>
                {/* Stripe Elements will go here */}
                <input
                  type="text"
                  name="card"
                  placeholder="Número de tarjeta"
                  required
                  style={inputStyle(isDark)}
                />
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    name="exp"
                    placeholder="MM/AA"
                    required
                    style={{ ...inputStyle(isDark), flex: 1 }}
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    required
                    style={{ ...inputStyle(isDark), flex: 1 }}
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre en la tarjeta"
                  required
                  style={inputStyle(isDark)}
                />
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    style={buttonStyle(isDark ? "#232323" : "#eee", isDark ? "#FFD700" : "#FFD700")}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    style={buttonStyle("#FFD700", "#000")}
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            )}

            {/* Review Step */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#FFD700",
                  marginBottom: "10px",
                  textShadow: !isDark
                    ? "1px 1px 0 #000, 0 0 6px #FFD700"
                    : "0 0 6px #FFD700",
                }}>
                  Revisar y confirmar
                </h3>
                <div>
                  <b>Envío:</b><br />
                  {shipping.name}<br />
                  {shipping.email}<br />
                  {shipping.address}, {shipping.city}, {shipping.postal}, {shipping.country}
                </div>
                <div>
                  <b>Pago:</b><br />
                  {/* Show masked card info here */}
                  Tarjeta terminada en ****
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    style={buttonStyle(isDark ? "#232323" : "#eee", isDark ? "#FFD700" : "#FFD700")}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    style={buttonStyle("#FFD700", "#000")}
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Finalizar compra"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </section>
  );
};

// Helper styles
function inputStyle(isDark: boolean) {
  return {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #FFD700",
    backgroundColor: isDark ? "#1e1e1e" : "#fff",
    color: isDark ? "#fff" : "#222",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "4px",
    width: "100%",
  } as React.CSSProperties;
}
function buttonStyle(bg: string, color: string) {
  return {
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: bg,
    color: color,
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    letterSpacing: "1px",
    transition: "background-color 0.3s, transform 0.3s",
  } as React.CSSProperties;
}