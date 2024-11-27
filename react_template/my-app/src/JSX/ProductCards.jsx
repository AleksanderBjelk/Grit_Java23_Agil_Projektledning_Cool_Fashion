//Step 2 in creating the cards

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ProductCardCarousel from './ProductcardCarousel.jsx';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../data/firebase.js';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            let q = query(collection(db, "products"));
            if (categoryId) {
                q = query(
                    collection(db, "products"),
                    where("mainCategory", "==", categoryId) // Adjust field as needed
                );
            }

            const querySnapshot = await getDocs(q);
            const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

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
