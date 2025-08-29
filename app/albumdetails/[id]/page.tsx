import React from "react";

type AlbumDetailsProps = {
  album?: {
    title: string;
    artist: string;
    genre: string;
    year: string;
    price: string;
    image: string;
    description: string;
    tracks: string[];
    isLimited?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
  };
};

const mockAlbum = {
  title: "The Beatles: Abbey Road",
  artist: "The Beatles",
  genre: "Rock",
  year: "1969",
  price: "$49.99",
  image: "/images/abbey-road.jpg",
  description:
    "Uno de los discos más icónicos de la historia, con clásicos como 'Come Together' y 'Here Comes the Sun'. Edición especial remasterizada.",
  tracks: [
    "Come Together",
    "Something",
    "Maxwell's Silver Hammer",
    "Oh! Darling",
    "Octopus's Garden",
    "I Want You (She’s So Heavy)",
    "Here Comes the Sun",
    "Because",
    "You Never Give Me Your Money",
    "Sun King",
    "Mean Mr. Mustard",
    "Polythene Pam",
    "She Came In Through the Bathroom Window",
    "Golden Slumbers",
    "Carry That Weight",
    "The End",
    "Her Majesty",
  ],
  isLimited: true,
  isBestSeller: true,
  isOnSale: false,
};

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album = mockAlbum }) => (
  <section
    style={{
      background: "var(--section)",
      color: "var(--text)",
      borderRadius: "18px",
      margin: "40px auto",
      maxWidth: 700,
      padding: "36px 18px",
      boxShadow: "var(--shadow)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24,
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        width: "100%",
      }}
    >
      <img
        src={album.image}
        alt={album.title}
        style={{
          width: 220,
          height: 220,
          objectFit: "cover",
          borderRadius: 12,
          boxShadow: "var(--shadow)",
          marginBottom: 8,
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", marginBottom: 6 }}>
          {album.title}
        </h2>
        <div style={{ color: "var(--muted)", fontSize: "1.1rem", marginBottom: 8 }}>
          <b>{album.artist}</b> &bull; {album.genre} &bull; {album.year}
        </div>
        <div style={{ marginBottom: 10 }}>
          {album.isBestSeller && (
            <span style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: 6,
              padding: "2px 10px",
              fontWeight: "bold",
              fontSize: "0.92rem",
              marginRight: 8,
            }}>Best Seller</span>
          )}
          {album.isLimited && (
            <span style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: 6,
              padding: "2px 10px",
              fontWeight: "bold",
              fontSize: "0.92rem",
              marginRight: 8,
            }}>Edición Limitada</span>
          )}
          {album.isOnSale && (
            <span style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: 6,
              padding: "2px 10px",
              fontWeight: "bold",
              fontSize: "0.92rem",
            }}>En Oferta</span>
          )}
        </div>
        <div style={{ fontWeight: "bold", fontSize: "1.25rem", color: "var(--accent)", marginBottom: 10 }}>
          {album.price}
        </div>
        <p style={{ color: "var(--text)", fontSize: "1.08rem", marginBottom: 14 }}>
          {album.description}
        </p>
      </div>
    </div>
    <div
      style={{
        background: "var(--card)",
        borderRadius: 10,
        boxShadow: "var(--shadow)",
        padding: "18px 16px",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        color: "var(--text)",
        fontSize: "1.05rem",
      }}
    >
      <b>Lista de canciones:</b>
      <ol style={{ margin: "12px 0 0 18px", padding: 0, textAlign: "left" }}>
        {album.tracks.map((track, idx) => (
          <li key={idx} style={{ marginBottom: 2 }}>{track}</li>
        ))}
      </ol>
    </div>
    <button
      style={{
        background: "var(--accent)",
        color: "var(--bg)",
        border: "none",
        borderRadius: "8px",
        padding: "12px 28px",
        fontWeight: "bold",
        fontSize: "1.08rem",
        cursor: "pointer",
        marginTop: 18,
        boxShadow: "var(--shadow)",
        transition: "background 0.2s, color 0.2s",
      }}
      onClick={() => alert("¡Agregado al carrito! (aquí irá la lógica real)")}
    >
      Agregar al carrito
    </button>
  </section>
);

export default AlbumDetails;
