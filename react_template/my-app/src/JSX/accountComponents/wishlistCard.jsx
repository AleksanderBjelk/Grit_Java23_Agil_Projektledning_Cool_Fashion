import React, { useEffect, useState } from "react";
import ProductCardCarousel from "../productComponents/ProductcardCarousel.jsx";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../data/firebase.js";

//Vi hämtar wishlist från users i DB i delar (chunks)
//och sen jämför mot productId i products i DB och
//stoppar in i product cards

const WishlistCard = () => {
    const [products, setProducts] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                if (!userId) {
                    console.error("User ID not found. Please log in.");
                    return;
                }

                // hämtar wishlist arrayen
                const userDocRef = doc(db, "Users", userId);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    console.error("User not found.");
                    return;
                }

                const wishlist = userDoc.data().wishlist || [];
                if (wishlist.length === 0) {
                    console.log("Wishlist is empty.");
                    setProducts([]);
                    return;
                }

                // query till products i DB för matchande ID:n
                const productsRef = collection(db, "products");

                // Firestore tillåter max 10, uppdelat i chunks så man kan hämta allt även om det är fler
                const productChunks = [];
                for (let i = 0; i < wishlist.length; i += 10) {
                    const chunk = wishlist.slice(i, i + 10);
                    const q = query(
                        productsRef,
                        where("__name__", "in", chunk)
                    ); // "__name__" är för document IDs
                    productChunks.push(getDocs(q));
                }

                // väntar på alla chunks
                const querySnapshots = await Promise.all(productChunks);

                // kombinera till en array
                const productList = querySnapshots.flatMap((snapshot) =>
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );

                setProducts(productList);
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            }
        };

        fetchWishlistProducts();
    }, [userId]);

    return (
        <div className="product-grid">
            {products.length === 0 ? (
                <p>Din wishlist är tom.</p>
            ) : (
                products.map((product) => (
                    <ProductCardCarousel
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        images={product.images}
                    />
                ))
            )}
        </div>
    );
};

export default WishlistCard;
