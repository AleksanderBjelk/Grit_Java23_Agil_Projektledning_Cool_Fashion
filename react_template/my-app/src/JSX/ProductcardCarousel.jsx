import React, { useState } from 'react';
import '../CSS/ProductCards.css';

const ProductCardCarousel = ({ name, price, images }) => {
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

 //All of the data is taken from the products.json so we can changed whatever we want in there and also it would be easy to add things to the cards and make the app compatible with a database -- Future proofed!
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
      <h3>{name}</h3> {/* Product Name */}
      <p>{price}</p> {/* Product Price */}
    </div>
  );
};

export default ProductCardCarousel;
