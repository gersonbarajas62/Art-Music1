"use client";
import Image from "next/image";

const Recommendations = ({ genre }: { genre: string }) => {
  const recommendedAlbums = [
    { id: 1, name: "Revolver", imageUrl: "/images/beatles-vinyl.jpg", price: "$20.00" },
    { id: 2, name: "Let It Be", imageUrl: "/images/beatles-vinyl.jpg", price: "$18.00" },
    { id: 3, name: "Rubber Soul", imageUrl: "/images/beatles-vinyl.jpg", price: "$22.00" },
  ];

  return (
    <div className="recommendations">
      <h2>Recommended Albums in {genre}</h2>
      <div className="recommendation-list">
        {recommendedAlbums.map((album) => (
          <div key={album.id} className="recommendation-card">
            <Image
              src={album.imageUrl}
              alt={album.name}
              width={100}
              height={100}
              className="recommendation-image"
            />
            <p>{album.name}</p>
            <p>{album.price}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .recommendations {
          margin-top: 20px;
        }

        .recommendation-list {
          display: flex;
          gap: 20px;
          overflow-x: auto;
        }

        .recommendation-card {
          background-color: #2a2a2a;
          padding: 10px;
          border-radius: 10px;
          text-align: center;
          min-width: 150px;
        }

        .recommendation-image {
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Recommendations;
