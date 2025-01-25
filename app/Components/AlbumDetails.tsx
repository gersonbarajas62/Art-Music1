"use client"; // Ensures it's a client component
import Image from "next/image";
import Recommendations from "./Recommendas";

const AlbumDetails = () => {
  const album = {
    imageUrl: "/images/beatles-vinyl.jpg", // Use a placeholder image
    name: "Abbey Road",
    description: "The Beatles' iconic album, released in 1969.",
    quantity: 10,
    condition: "New",
    price: "$25.00",
    genre: "Rock",
  };

  return (
    <div className="album-details">
      <div className="album-info">
        <Image
          src={album.imageUrl}
          alt={album.name}
          width={300}
          height={300}
          className="album-image"
        />
        <div className="album-meta">
          <h1>{album.name}</h1>
          <p>{album.description}</p>
          <p><strong>Quantity Available:</strong> {album.quantity}</p>
          <p><strong>Condition:</strong> {album.condition}</p>
          <p><strong>Price:</strong> {album.price}</p>
          <p><strong>Genre:</strong> {album.genre}</p>
        </div>
      </div>

      {/* Reusable Recommendations Component */}
      <Recommendations genre={album.genre} />

      <style jsx>{`
        .album-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          background-color: #1a1a1a;
          color: white;
          border-radius: 10px;
        }

        .album-info {
          display: flex;
          gap: 20px;
        }

        .album-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .album-image {
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AlbumDetails;
