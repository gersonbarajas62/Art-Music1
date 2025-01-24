"use client"; //  Add this to make it a Client Component

import { useState } from 'react';

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button prev-button">
        ❮
      </button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="carousel-image" />
      <button onClick={handleNext} className="carousel-button next-button">
        ❯
      </button>

      <style jsx>{`
        .carousel {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
          overflow: hidden;
          border-radius: 10px;
        }

        .carousel-image {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 24px;
        }

        .prev-button {
          left: 10px;
        }

        .next-button {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
