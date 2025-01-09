"use client"; // This marks the file as a Client Component

export default function Home() {
  return (
    <section className="container">
      <div
        className="flex flex-center"
        style={{
          flexDirection: "column",
          textAlign: "center",
          minHeight: "80vh",
        }}
      >
        <h1>Welcome to ART Music</h1>
        <p>Your one-stop shop for CDs and Vinyls!</p>
        <img
          src="/public/example-placeholder.jpg"
          alt="Music records"
          style={{ maxWidth: "400px", margin: "2rem auto" }}
        />
        <button
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert("Let’s Explore Music!")}
        >
          Explore Now
        </button>
      </div>
    </section>
  );
}
