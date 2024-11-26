//Step 2 in creating the cards

import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase.js';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCardCarousel
          key={product.id}
          name={product.name}
          price={product.price}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default ProductCard;
