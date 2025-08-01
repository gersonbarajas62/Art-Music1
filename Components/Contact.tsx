"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for backend connection
    console.log("Form submitted:", formData);
  };

  return (
    <section
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        padding: "60px 20px",
        borderRadius: "12px",
        margin: "40px auto",
        maxWidth: "900px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        ¿No encontraste lo que buscabas?
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "1rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        Contáctanos y te ayudaremos a encontrarlo. En <b>Artmusic</b>, estamos comprometidos a hacer que tu experiencia sea inigualable.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Full Name */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1rem",
            gap: "8px",
          }}
        >
          Nombre completo
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </label>

        {/* Email Address */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1rem",
            gap: "8px",
          }}
        >
          Correo electrónico
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </label>

        {/* Message */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1rem",
            gap: "8px",
          }}
        >
          Mensaje
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            required
            rows={5}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              fontSize: "1rem",
              resize: "none",
            }}
          />
        </label>

        {/* Checkbox */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem",
          }}
        >
          <input
            type="checkbox"
            required
            style={{ transform: "scale(1.2)", cursor: "pointer" }}
          />
          <label>
            Acepto la{" "}
            <a
              href="#"
              style={{
                color: "#FFD700",
                textDecoration: "none",
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
          style={{
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFD700",
            color: "#000",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "background-color 0.3s ease",
          }}
        >
          Enviar formulario
        </button>
      </form>
    </section>
  );
};

export default Contact;
