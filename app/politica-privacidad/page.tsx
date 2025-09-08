"use client";

export default function PoliticaPrivacidadPage() {
  return (
    <section style={{
      background: "var(--section)",
      color: "var(--text)",
      borderRadius: "16px",
      margin: "40px auto",
      maxWidth: "900px",
      padding: "48px 32px",
      boxShadow: "var(--shadow)",
      position: "relative",
    }}>
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2.2rem", marginBottom: 24, textAlign: "center" }}>
        Política de Privacidad
      </h2>
      <div style={{ fontSize: "1.08rem", lineHeight: 1.7, color: "var(--text)", maxWidth: 700, margin: "0 auto" }}>
        <p>
          En <b>Artmusic</b> valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
        </p>
        <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginTop: 24 }}>1. Información que recopilamos</h3>
        <ul>
          <li>Datos de contacto como nombre y correo electrónico cuando envías el formulario de contacto.</li>
          <li>Información de navegación y uso del sitio web.</li>
        </ul>
        <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginTop: 24 }}>2. Uso de la información</h3>
        <ul>
          <li>Responder a tus consultas y solicitudes.</li>
          <li>Mejorar nuestros servicios y tu experiencia en el sitio.</li>
          <li>No compartimos tu información personal con terceros, salvo obligación legal.</li>
        </ul>
        <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginTop: 24 }}>3. Seguridad</h3>
        <ul>
          <li>Implementamos medidas de seguridad para proteger tus datos.</li>
        </ul>
        <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginTop: 24 }}>4. Derechos del usuario</h3>
        <ul>
          <li>Puedes solicitar acceso, rectificación o eliminación de tus datos personales escribiendo a <a href="mailto:info@artmusic.com" style={{ color: "var(--accent)" }}>info@artmusic.com</a>.</li>
        </ul>
        <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginTop: 24 }}>5. Cambios en la política</h3>
        <ul>
          <li>Nos reservamos el derecho de modificar esta política. Los cambios se publicarán en esta página.</li>
        </ul>
        <p style={{ marginTop: 32, color: "var(--muted)", fontSize: "1rem" }}>
          Última actualización: Junio 2024
        </p>
      </div>
    </section>
  );
}
