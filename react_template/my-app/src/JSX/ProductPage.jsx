import { useParams } from "react-router-dom";
import { db } from "../data/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import "../CSS/productPage.css";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productDoc = await getDoc(doc(db, "products", id));
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                } else {
                    console.error("Produkt inte hittad");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Laddar produkt...</div>;

    return (
        <div className="product-page">
            <h1>{product.name}</h1>

            <div className="product-images">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.name} - Bild ${index + 1}`}
                        className="product-image"
                    />
                ))}
            </div>

            <div className="product-details">
                <p>{product.description}</p>
                <p className="product-price">{product.price} SEK</p>
                <div className="product-actions">
                    <button>Buy</button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;