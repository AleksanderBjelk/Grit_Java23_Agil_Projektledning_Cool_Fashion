import React, { useState } from 'react';
import productData from '../data/products.json';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import '../CSS/ProductCards.css';

const ProductGridCarousel = () => {
  const cardsToShow = 3; // Number of visible cards at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % productData.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        prevIndex === 0 ? productData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-carousel-container">
      <button className="prev-btn" onClick={handlePrev}>
        &lt;
      </button>
      <div className="product-carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${(productData.length / cardsToShow) * 100}%`,
          }}
        >
          {productData.map((product) => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ width: `${100 / productData.length}%` }}
            >
              <ProductCardCarousel
                name={product.name}
                price={product.price}
                images={product.images}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="next-btn" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default ProductGridCarousel;
