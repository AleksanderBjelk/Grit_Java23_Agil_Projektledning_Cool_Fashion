import { useParams, useNavigate } from "react-router-dom";
import { db } from "../data/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../CSS/productPage.css";

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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
            <img
                src="/media/back-undo-return-button-png-5.png"
                alt="Tillbaka"
                className="backButton"
                onClick={() => navigate(-1)}
            />
            <h1>{product.name}</h1>

            <div className="product-images">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.name} - Bild ${index + 1}`}
                        className="product-image"
                        onClick={() => {
                            setCurrentIndex(index);
                            setLightboxOpen(true);
                        }}
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

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={product.images.map((image) => ({
                        src: image,
                        alt: `${product.name}`,
                    }))}
                    index={currentIndex}
                />
            )}
        </div>
    );
}

export default ProductPage;