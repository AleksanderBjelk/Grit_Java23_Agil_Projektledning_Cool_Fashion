import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase.js';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'secondhand'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id, //The id is now set to the firebase-generated id, not using id "inside" the seconhand products anymore, will help down the line
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

export default ProductCard;
