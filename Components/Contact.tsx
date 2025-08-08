"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
    // Replace with real backend logic
  };

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <section
      style={{
        backgroundColor: "var(--vsc-bg)",
        color: "var(--vsc-foreground)",
        padding: "60px 20px",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "900px",
        boxShadow: isDark
          ? "0 8px 20px rgba(0,0,0,0.8)"
          : "0 8px 20px rgba(0,0,0,0.15)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        position: "relative",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2.2rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #FFD700 40%, #fff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: !isDark
            ? "2px 2px 0 #000, 0 0 8px #FFD700"
            : "0 0 8px #FFD700",
          letterSpacing: "1px",
        }}
      >
        ¿No encontraste lo que buscabas?
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "1.1rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "0 auto",
          color: "#FFD700",
          textShadow: !isDark
            ? "1px 1px 0 #000, 0 0 6px #FFD700"
            : "0 0 6px #FFD700",
        }}
      >
        Contáctanos y te ayudaremos a encontrarlo. En <b>Artmusic</b>, estamos comprometidos a hacer que tu experiencia sea inigualable.
      </p>

      {/* Success Message */}
      {success && (
        <div
          style={{
            background: "#FFD700",
            color: "#222",
            borderRadius: "8px",
            padding: "18px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            animation: "fadeIn 0.7s",
          }}
          aria-live="polite"
        >
          ¡Gracias por contactarnos! Te responderemos pronto.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "1fr",
          animation: "slideUp 1.2s 0.5s cubic-bezier(.77,0,.175,1)",
          animationFillMode: "forwards",
          opacity: 1,
        }}
        aria-label="Formulario de contacto"
      >
        {/* Full Name */}
        <label htmlFor="contact-name" style={{ display: "flex", flexDirection: "column", fontSize: "1rem", gap: "8px", color: "var(--vsc-foreground)" }}>
          Nombre completo
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            required
            autoComplete="name"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #FFD700",
              backgroundColor: isDark ? "#1e1e1e" : "#fffbe6",
              color: isDark ? "#fff" : "#222",
              fontSize: "1rem",
              outline: "none",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.4)"
                : "0 2px 8px rgba(0,0,0,0.08)",
              transition: "border-color 0.3s",
            }}
            aria-required="true"
          />
        </label>

        {/* Email Address */}
        <label htmlFor="contact-email" style={{ display: "flex", flexDirection: "column", fontSize: "1rem", gap: "8px", color: "var(--vsc-foreground)" }}>
          Correo electrónico
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            required
            autoComplete="email"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #FFD700",
              backgroundColor: isDark ? "#1e1e1e" : "#fffbe6",
              color: isDark ? "#fff" : "#222",
              fontSize: "1rem",
              outline: "none",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.4)"
                : "0 2px 8px rgba(0,0,0,0.08)",
              transition: "border-color 0.3s",
            }}
            aria-required="true"
          />
        </label>

        {/* Message */}
        <label htmlFor="contact-message" style={{ display: "flex", flexDirection: "column", fontSize: "1rem", gap: "8px", color: "var(--vsc-foreground)" }}>
          Mensaje
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            required
            rows={5}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #FFD700",
              backgroundColor: isDark ? "#1e1e1e" : "#fffbe6",
              color: isDark ? "#fff" : "#222",
              fontSize: "1rem",
              resize: "none",
              outline: "none",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.4)"
                : "0 2px 8px rgba(0,0,0,0.08)",
              transition: "border-color 0.3s",
            }}
            aria-required="true"
          />
        </label>

        {/* Checkbox */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "var(--vsc-foreground)" }}>
          <input
            id="privacy"
            type="checkbox"
            required
            style={{
              transform: "scale(1.2)",
              cursor: "pointer",
              accentColor: "#FFD700",
            }}
            aria-required="true"
          />
          <label htmlFor="privacy">
            Acepto la{" "}
            <a
              href="#"
              style={{
                color: "#FFD700",
                textDecoration: "underline",
                fontWeight: "bold",
                textShadow: !isDark
                  ? "1px 1px 0 #000, 0 0 6px #FFD700"
                  : "0 0 6px #FFD700",
              }}
            >
              Política de privacidad
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: submitting ? "#bbb" : "#FFD700",
            color: "#000",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: submitting ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            boxShadow: isDark
              ? "0 4px 12px rgba(0,0,0,0.6)"
              : "0 4px 12px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            if (!submitting) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 6px 16px rgba(0,0,0,0.8)"
                : "0 6px 16px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!submitting) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 4px 12px rgba(0,0,0,0.6)"
                : "0 4px 12px rgba(0,0,0,0.1)";
            }
          }}
        >
          {submitting ? "Enviando..." : "Enviar formulario"}
        </button>
      </form>

      {/* Alternative Contact Info */}
      <div style={{
        marginTop: "40px",
        textAlign: "center",
        color: isDark ? "#FFD700" : "#222",
        fontSize: "1.05rem",
        opacity: 0.85,
      }}>
        <div style={{ marginBottom: 8 }}>
          <b>Email:</b> <a href="mailto:info@artmusic.com" style={{ color: "#FFD700" }}>info@artmusic.com</a>
        </div>
        <div>
          <b>WhatsApp:</b> <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer" style={{ color: "#FFD700" }}>+52 1 555 555 5555</a>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
