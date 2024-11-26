//Step 1 in creating the cards
import React, { useState } from 'react';
import '../CSS/ProductCards.css';

const ProductCardCarousel = ({ id, name, price, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //Change to next picture in card
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  //Change to previous picture in card
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-card">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {/* Can use how many pictures we want */}
          {images.map((image, index) => (
            <img key={index} src={image} alt={`${name} ${index + 1}`} />
          ))}
        </div>
        <button className="prev-btn" onClick={handlePrev}>
          &lt; {/* these produces the <> arrows in the cards */}
        </button>
        <button className="next-btn" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <h3>{id}</h3> {/* Mest för att kunna visa id sålänge, ska tas bort sen */}
      <h3>{name}</h3> {/* Product Name */}
      <p>{price}</p> {/* Product Price */}
      <div>
        <button className='cardButton'>Buy</button>
      </div>
    </div>
  );
};

export default ProductCardCarousel;
