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

    const getStock = () => {
        if (product.stock === 0) {
            return { text: "Tyvärr är denna produkten restad", color: "red" };
        } else if (product.stock === 1) {
            return { text: "En kvar i lager", color: "orange" };
        } else {
            return { text: "Finns i lager", color: "green" };
        }
    };

    const stockStatus = getStock();

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
                <div className="main-image">
                    <img
                        src={product.images[currentIndex]} 
                        alt={`${product.name} - Huvudbild`}
                        className="product-image large-image"
                        onClick={() => setLightboxOpen(true)} 
                    />
                </div>
                <div className="thumbnail-images">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} - Thumbnail ${index + 1}`}
                            className={`product-image small-image ${
                                index === currentIndex ? "selected" : ""
                            }`} 
                            onClick={() => setCurrentIndex(index)} 
                        />
                    ))}
                </div>
            </div>

            <div className="product-details">
                <p>{product.description}</p>
                <p className="product-price">{product.price} SEK</p>
                <div className="product-actions">
                    <button disabled={product.stock === 0}>Buy</button>
                    <p
                        style={{ color: stockStatus.color }}
                        className="stock-status"
                    >
                        {stockStatus.text}
                    </p>
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