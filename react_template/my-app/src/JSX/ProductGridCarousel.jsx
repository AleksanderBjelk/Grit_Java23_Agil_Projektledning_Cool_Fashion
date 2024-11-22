import React, { useState } from 'react';
import productData from '../data/products.json';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import '../CSS/ProductCards.css';

const ProductGridCarousel = () => {
  const cardsToShow = 4; // Number of visible cards at a time (use an integer here)
  const [currentIndex, setCurrentIndex] = useState(0);

  //Move to the next set of cards
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      //Move to the next index, wrap around when reaching the end
      const nextIndex = prevIndex + 1;
      return nextIndex >= productData.length - cardsToShow + 1 ? 0 : nextIndex;
    });
  };

  //Move to the previous set of cards
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      //Move to the previous index, wrap around when going below 0
      const prevIndexAdjusted = prevIndex - 1;
      return prevIndexAdjusted < 0 ? productData.length - cardsToShow : prevIndexAdjusted;
    });
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
            //Har problem med denna uträkningen, där det står 33 vill vi ha 100 men det gör så att den "overshootar" och visar tomma slides, utan produktkort då translateX går till -200% och inte -100%.
            transform: `translateX(-${currentIndex * (33 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${productData.length * (100 / cardsToShow)}%`, //Ensure the width is based on the number of items
          }}
        >
          {productData.map((product) => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ width: `${100 / productData.length}%` }} //Each card takes up a percentage of the total width
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
