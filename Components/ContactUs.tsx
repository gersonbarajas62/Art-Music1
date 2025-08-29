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
        background: "var(--section)",
        color: "var(--text)",
        padding: "48px 20px",
        borderRadius: "16px",
        margin: "40px auto",
        maxWidth: "600px",
        boxShadow: "var(--shadow)",
        animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
        animationFillMode: "forwards",
        opacity: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "var(--accent)",
          letterSpacing: "1px",
        }}
      >
        ¿No encontraste lo que buscabas?
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "36px",
          fontSize: "1.1rem",
          lineHeight: "1.7",
          maxWidth: "440px",
          margin: "0 auto 36px auto",
          color: "var(--muted)",
        }}
      >
        Contáctanos y te ayudaremos a encontrarlo. En <b>Artmusic</b>, estamos comprometidos a hacer que tu experiencia sea inigualable.
      </p>

      {/* Success Message */}
      {success && (
        <div
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.08rem",
            marginBottom: "24px",
            boxShadow: "var(--shadow)",
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
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          animation: "slideUp 1.2s 0.5s cubic-bezier(.77,0,.175,1)",
          animationFillMode: "forwards",
          opacity: 1,
        }}
        aria-label="Formulario de contacto"
      >
        {/* Full Name */}
        <label htmlFor="contact-name" style={{ fontWeight: 600, color: "var(--accent)" }}>
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
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "1rem",
              outline: "none",
              marginTop: 6,
            }}
            aria-required="true"
          />
        </label>

        {/* Email Address */}
        <label htmlFor="contact-email" style={{ fontWeight: 600, color: "var(--accent)" }}>
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
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "1rem",
              outline: "none",
              marginTop: 6,
            }}
            aria-required="true"
          />
        </label>

        {/* Message */}
        <label htmlFor="contact-message" style={{ fontWeight: 600, color: "var(--accent)" }}>
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
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "1rem",
              outline: "none",
              marginTop: 6,
              resize: "vertical",
            }}
            aria-required="true"
          />
        </label>

        {/* Checkbox */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "var(--text)" }}>
          <input
            id="privacy"
            type="checkbox"
            required
            style={{
              transform: "scale(1.1)",
              cursor: "pointer",
              accentColor: "var(--accent)",
            }}
            aria-required="true"
          />
          <label htmlFor="privacy">
            Acepto la{" "}
            <a
              href="#"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                fontWeight: "bold",
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
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            background: submitting ? "var(--muted)" : "var(--accent)",
            color: "var(--bg)",
            fontSize: "1.08rem",
            fontWeight: "bold",
            cursor: submitting ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            boxShadow: "var(--shadow)",
            transition: "background 0.2s, color 0.2s, transform 0.2s",
          }}
        >
          {submitting ? "Enviando..." : "Enviar formulario"}
        </button>
      </form>

      {/* Alternative Contact Info */}
      <div style={{
        marginTop: "36px",
        textAlign: "center",
        color: "var(--muted)",
        fontSize: "1.05rem",
        opacity: 0.95,
      }}>
        <div style={{ marginBottom: 8 }}>
          <b>Email:</b> <a href="mailto:info@artmusic.com" style={{ color: "var(--accent)" }}>info@artmusic.com</a>
        </div>
        <div>
          <b>WhatsApp:</b> <a href="https://wa.me/5215555555555" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>+52 1 555 555 5555</a>
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
