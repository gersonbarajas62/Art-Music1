"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CartContext } from "./CartProvider";
// import CheckoutForm from "./CheckoutForm"; // If you split it, or just use the function directly

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

// CheckoutForm.tsx
const steps = ["Envío", "Pago", "Revisar"];

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

function CheckoutForm() {
  const { cart } = React.useContext(CartContext) as { cart: CartItem[] };
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
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
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    setIsDark(typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  }, []);

  const total = cart.reduce((acc: number, item) => acc + item.price * item.quantity, 0) + shippingCost;

  // Basic shipping validation
  const validateShipping = () => {
    if (!shipping.name || !shipping.email || !shipping.address || !shipping.city || !shipping.postal || !shipping.country) {
      setError("Por favor completa todos los campos de envío.");
      return false;
    }
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(shipping.email)) {
      setError("Introduce un correo electrónico válido.");
      return false;
    }
    setError(null);
    return true;
  };

  // Calculate shipping cost (placeholder for FedEx/Correos API)
  const calculateShipping = async () => {
    // Replace with real shipping calc
    setShippingCost(150);
  };

  // Create Stripe PaymentIntent (server call). returns { clientSecret, orderId }
  const createStripeIntent = async () => {
    setCreatingIntent(true);
    setIntentError(null);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, shipping, shippingCost }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create payment intent");
      }
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId ?? null);
      return data;
    } catch (err: any) {
      console.error("createStripeIntent error", err);
      setIntentError(err?.message || "No se pudo iniciar el pago");
      return null;
    } finally {
      setCreatingIntent(false);
    }
  };

  // Handlers
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // Move to next step: if leaving shipping step, calculate shipping and create intent BEFORE showing PaymentStep
  const handleNext = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    if (step === 0) {
      // validate shipping first
      if (!validateShipping()) return;
      await calculateShipping();
      // create intent will be triggered by effect when step becomes 1 (see below)
      setStep(1);
      return;
    }
    // For other steps, just advance
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  // Create PaymentIntent when user reaches payment step (step===1)
  useEffect(() => {
    let mounted = true;
    if (step === 1 && !clientSecret) {
      (async () => {
        setIntentError(null);
        setCreatingIntent(true);
        const intent = await createStripeIntent();
        if (!mounted) return;
        if (!intent || !intent.clientSecret) {
          // stay on step 1 and show error
          setStep(1);
        } else {
          setClientSecret(intent.clientSecret);
        }
        setCreatingIntent(false);
      })();
    }
    return () => { mounted = false; };
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Finalize order: ask server to confirm/finalize order record (server verifies payment status)
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!orderId) throw new Error("No se encontró la orden");
      const res = await fetch("/api/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Error al confirmar orden en el servidor");
      }
      const data = await res.json();
      // data may contain order status
      if (data.status === "paid" || data.confirmed) {
        setOrderPlaced(true);
      } else {
        // if not yet marked paid server-side, mark pending but show confirmation
        setOrderPlaced(true); // still show thank-you but you may want to show pending state
      }
    } catch (err: any) {
      console.error("handlePlaceOrder error", err);
      setError(err?.message || "Error al procesar la orden");
    } finally {
      setLoading(false);
    }
  };

  // Payment Step component
  type PaymentStepProps = {
    clientSecret: string;
    shipping: typeof shipping;
    onSuccess: () => void;
    onError: (msg: string) => void;
  };

  function PaymentStep({ clientSecret, shipping, onSuccess, onError }: PaymentStepProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        setLoading(false);
        onError("Stripe aún no está listo. Intenta de nuevo en unos segundos.");
        return;
      }
      const card = elements.getElement(CardElement);
      if (!card) {
        setLoading(false);
        onError("No se encontró el campo de tarjeta");
        return;
      }
      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card, billing_details: { name: shipping.name, email: shipping.email } },
        });
        setLoading(false);
        if (result.error) {
          onError(result.error.message ?? "Error en el pago");
          return;
        }
        if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
          // Notify backend and finalize order record
          await fetch("/api/payment-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId: result.paymentIntent.id }),
          });
          if (orderId) {
            await fetch("/api/confirm-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId }),
            });
          }
          onSuccess();
        } else {
          onError("Pago no completado");
        }
      } catch (err: any) {
        setLoading(false);
        onError(err?.message || "Error en la confirmación del pago");
      }
    };

    // Guard: don't render until clientSecret exists
    if (!clientSecret) {
      return (
        <div style={{ padding: 12, textAlign: "center", color: "var(--muted)" }}>
          {creatingIntent ? "Preparando el pago..." : intentError || "No se pudo iniciar el pago."}
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{
          background: "#222",
          borderRadius: 10,
          padding: "18px 16px",
          marginBottom: 18,
          boxShadow: "var(--shadow)",
        }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#fff",
                  letterSpacing: "1px",
                  '::placeholder': { color: "#bbb" },
                  iconColor: "#FFD700",
                },
                invalid: {
                  color: "#ff4d4f",
                  iconColor: "#ff4d4f",
                },
              },
            }}
          />
        </div>
        <button type="submit" style={buttonStyle("var(--accent)", "var(--bg)")} disabled={loading}>
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </form>
    );
  }

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
          color: idx === step ? "var(--accent)" : "var(--muted)",
          fontWeight: idx === step ? "bold" : "normal",
          fontSize: "1.05rem",
        }}>
          <span style={{
            display: "inline-block",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: idx <= step ? "var(--accent)" : "var(--card)",
            color: idx <= step ? "var(--bg)" : "var(--muted)",
            textAlign: "center",
            lineHeight: "22px",
            marginRight: 8,
            fontWeight: "bold",
            border: idx === step ? "2px solid var(--accent)" : "2px solid var(--border)",
            boxShadow: idx === step ? "0 0 8px var(--accent)" : undefined,
            transition: "all 0.2s",
          }}>{idx + 1}</span>
          {label}
          {idx < steps.length - 1 && (
            <span style={{
              margin: "0 12px",
              color: "var(--accent)",
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
        background: "var(--section)",
        color: "var(--text)",
        padding: "48px 20px",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "900px",
        boxShadow: "var(--shadow)",
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
          color: "var(--accent)",
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
                color: "var(--accent)",
                marginBottom: "18px",
                textShadow: "0 2px 8px var(--bg)",
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
                    background: "var(--card)",
                    borderRadius: "10px",
                    boxShadow: "var(--shadow)",
                    padding: "10px",
                    gap: "14px",
                    border: "1px solid var(--border)",
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
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      boxShadow: "var(--shadow)",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "var(--accent)",
                        marginBottom: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "var(--muted)" }}>
                      ${item.price} x {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: "bold", color: "var(--accent)" }}>
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "22px",
                paddingTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "var(--accent)",
              }}
            >
              <span>Envío</span>
              <span>${shippingCost}</span>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "8px",
                paddingTop: "8px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "var(--accent)",
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
            background: "var(--card)",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            padding: "28px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            border: "1px solid var(--border)",
          }}>
            {/* Shipping Step */}
            {step === 0 && (
              <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "var(--accent)",
                  marginBottom: "10px",
                  textShadow: "0 2px 8px var(--bg)",
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
                  style={inputStyle()}
                />
                <input
                  type="email"
                  name="email"
                  value={shipping.email}
                  onChange={handleShippingChange}
                  placeholder="Correo electrónico"
                  required
                  style={inputStyle()}
                />
                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  placeholder="Dirección"
                  required
                  style={inputStyle()}
                />
                <input
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="Ciudad"
                  required
                  style={inputStyle()}
                />
                <input
                  type="text"
                  name="postal"
                  value={shipping.postal}
                  onChange={handleShippingChange}
                  placeholder="Código postal"
                  required
                  style={inputStyle()}
                />
                <input
                  type="text"
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  placeholder="País"
                  required
                  style={inputStyle()}
                />
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button
                    type="submit"
                    style={buttonStyle("var(--accent)", "var(--bg)")}
                  >
                    Siguiente
                  </button>
                </div>
              </form>
            )}

            {/* Payment Step */}
            {step === 1 && (
              <PaymentStep
                clientSecret={clientSecret}
                shipping={shipping}
                onSuccess={() => setStep(2)}
                onError={setError}
              />
            )}

            {/* Review Step */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "var(--accent)",
                  marginBottom: "10px",
                  textShadow: "0 2px 8px var(--bg)",
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
                    style={buttonStyle("var(--card)", "var(--accent)")}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    style={buttonStyle("var(--accent)", "var(--bg)")}
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
          @media (max-width: 900px) {
            section {
              padding: 24px 2vw !important;
              max-width: 100vw !important;
            }
            .cart-summary, .step-form {
              min-width: 100% !important;
              flex: 1 1 100% !important;
              margin-bottom: 24px !important;
            }
            .stepper {
              flex-direction: column !important;
              gap: 12px !important;
            }
          }
          @media (max-width: 600px) {
            section {
              padding: 8px 1vw !important;
              max-width: 100vw !important;
            }
            .cart-summary, .step-form {
              min-width: 100% !important;
              flex: 1 1 100% !important;
              margin-bottom: 18px !important;
            }
            .stepper {
              flex-direction: column !important;
              gap: 8px !important;
            }
          }
        `}
      </style>

      {/* SECURITY NOTES:
        - Never expose your Stripe secret key on the frontend (only use publishable key here).
        - Always validate cart and amounts server-side in your payment.js backend.
        - Use HTTPS for all frontend/backend requests in production.
        - Use Stripe webhooks to confirm payment and fulfill orders securely.
        - Stripe's standard plan supports international payments and most cards/countries. Just enable international payments in your Stripe dashboard.
      */}
    </section>
  );
};

// Helper styles
function inputStyle() {
  return {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--text)",
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
    background: bg,
    color: color,
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
    boxShadow: "var(--shadow)",
    letterSpacing: "1px",
    transition: "background-color 0.3s, transform 0.3s",
  } as React.CSSProperties;
}