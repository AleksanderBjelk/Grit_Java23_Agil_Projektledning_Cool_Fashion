//Step 3 in creating the cards

import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase.js';
import '../CSS/ProductCards.css';

const ProductGridCarousel = () => {
  const [products, setProducts] = useState([]);
  const cardsToShow = 4; // Number of visible cards at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id, //The id is now set to the firebase-generated id, not using id "inside" the products anymore, will help down the line
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex + 1 >= products.length - cardsToShow + 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex - 1 < 0 ? products.length - cardsToShow : prevIndex - 1
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
            transform: `translateX(-${currentIndex * (34 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${products.length * (100 / cardsToShow)}%`
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCardCarousel
                id={product.id}
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
