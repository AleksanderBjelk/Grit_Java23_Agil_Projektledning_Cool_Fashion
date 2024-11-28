//Step 3 in creating the cards

import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from '../data/firebase.js';
import '../CSS/ProductCards.css';

const ProductGridCarousel = () => {
  const [products, setProducts] = useState([]);
  const cardsToShow = 4; //Number of visible cards at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            //Calculate the timestamp for one week ago
            const oneWeekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

            let q = query(
                collection(db, "products"),
                where("createdAt", ">=", oneWeekAgo) //Filter for recent products
            );

            const querySnapshot = await getDocs(q);
            const productList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    fetchProducts();
}, [setProducts]);


  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= products.length - cardsToShow + 1 ? 0 : prevIndex + 1
    );
};

const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
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
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}          
        >
          {products.map(product => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ width: `${100 / cardsToShow}%` }}
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
