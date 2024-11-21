import React from 'react';
import productData from '../data/products.json';
import ProductCard from './ProductcardCarousel.jsx';

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {productData.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default ProductGrid;