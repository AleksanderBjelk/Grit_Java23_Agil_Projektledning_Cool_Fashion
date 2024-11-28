import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductCardCarousel from "./ProductcardCarousel.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase.js";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const { categoryId, intermediateId, subId } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let q = query(collection(db, "products"));
                if (subId) {
                    q = query(
                        collection(db, "products"),
                        where("subCategory", "==", subId)
                    );
                } else if (intermediateId) {
                    q = query(
                        collection(db, "products"),
                        where("intermediateCategory", "==", intermediateId)
                    );
                } else if (categoryId) {
                    q = query(
                        collection(db, "products"),
                        where("mainCategory", "==", categoryId)
                    );
                }

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
    }, [categoryId, intermediateId, subId]);

    return (
        <div className="product-grid">
            {products.map((product) => (
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
