"use client"; // Ensure the file is a Client Component

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "50px 20px",
        backgroundImage: "url('/images/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1.2",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          El hogar del rock raro
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            lineHeight: "1.5",
            textShadow: "1px 1px 6px rgba(0, 0, 0, 0.6)",
          }}
        >
          CDs y vinilos que no encontrarás en otro lugar. Somos tu lugar
          indicado para tus compras de discos y vinilos raros, importados de
          Japón y Europa. Discos nuevos y usados para coleccionistas con una
          pasión única por la música.
        </p>
        <div>
          <button
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.3s, background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f7c600")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFD700")
            }
          >
            Explorar Catálogo
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#FFD700",
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.3s, color 0.3s, background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#FFD700";
              e.currentTarget.style.color = "#000";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FFD700";
            }}
          >
            Más Información
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
