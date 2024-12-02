import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase.js';

const SecondhandProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'secondhand'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching secondhand: ', error);
      }
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

export default SecondhandProductCard;
