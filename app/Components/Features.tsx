"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Features.css'; // Add custom styles if needed

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Features = () => {
  const newReleases = [
    { id: 1, title: 'Rare Beatles Vinyl', price: '$150', image: '/images/beatles-vinyl.jpg' },
    { id: 2, title: 'Pink Floyd Limited Edition', price: '$200', image: '/images/pink-floyd.jpg' },
    { id: 3, title: 'Japanese Rock CD', price: '$80', image: '/images/japanese-rock.jpg' },
    { id: 4, title: 'Rolling Stones Vinyl', price: '$180', image: '/images/rolling-stones.jpg' },
    { id: 5, title: 'Rare Nirvana Album', price: '$250', image: '/images/nirvana.jpg' },
  ];

  const staticItems = [
    { id: 1, title: 'Exclusive Vinyls', image: '/images/exclusive-vinyls.jpg' },
    { id: 2, title: 'Top Rock Hits', image: '/images/top-rock-hits.jpg' },
    { id: 3, title: 'Collector\'s Editions', image: '/images/collectors.jpg' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="features-container" style={{ backgroundColor: '#000', color: '#fff', padding: '20px' }}>
      {/* Static Top Row */}
      <div className="features-static-row">
        {staticItems.map((item) => (
          <div key={item.id} className="static-item">
            <img src={item.image} alt={item.title} className="static-image" />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Carousel Row */}
      <div className="features-carousel-row">
        <Slider {...settings}>
          {newReleases.map((release) => (
            <div key={release.id} className="carousel-item">
              <img src={release.image} alt={release.title} className="carousel-image" />
              <h4>{release.title}</h4>
              <p>{release.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Features;
