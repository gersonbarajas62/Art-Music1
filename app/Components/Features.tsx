"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Features.css'; // Add custom styles if needed

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Features = () => {
  const newReleases = [
    { id: 1, title: 'Vinilo Raro de The Beatles', price: '$150', image: '/images/beatles-vinyl.jpg' },
    { id: 2, title: 'Edición Limitada de Pink Floyd', price: '$200', image: '/images/pink-floyd.jpg' },
    { id: 3, title: 'CD de Rock Japonés', price: '$80', image: '/images/japanese-rock.jpg' },
    { id: 4, title: 'Vinilo de The Rolling Stones', price: '$180', image: '/images/rolling-stones.jpg' },
    { id: 5, title: 'Álbum Raro de Nirvana', price: '$250', image: '/images/nirvana.jpg' },
  ];

  const staticItems = [
    { id: 1, title: 'Vinilos Exclusivos', image: '/images/exclusive-vinyls.jpg' },
    { id: 2, title: 'Éxitos de Rock', image: '/images/top-rock-hits.jpg' },
    { id: 3, title: 'Ediciones de Colección', image: '/images/collectors.jpg' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="features-container" style={{ padding: '20px', backgroundImage: "url('/images/background-texture.jpg')", backgroundSize: 'cover', color: '#fff', borderRadius: '12px' }}>
      {/* Static Top Row */}
      <div className="features-static-row">
        {staticItems.map((item) => (
          <div key={item.id} className="static-item">
            <img src={item.image} alt={item.title} className="static-image" />
            <h3 style={{ color: '#FFD700' }}>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Carousel Row with Highlighted Header */}
      <div className="features-carousel-row">
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#FF4500', fontWeight: 'bold', fontSize: '1.8rem', textShadow: '2px 2px 4px #000' }}>
        🔥Nuevas Llegadas
        </h2>
        <Slider {...settings}>
          {newReleases.map((release) => (
            <div key={release.id} className="carousel-item" style={{ position: 'relative' }}>
              <img src={release.image} alt={release.title} className="carousel-image" />
              <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', background: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '8px' }}>
                <h4 style={{ margin: 0, color: '#FFD700' }}>{release.title}</h4>
                <p style={{ margin: 0, color: '#FFFFFF', fontWeight: 'bold' }}>{release.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
