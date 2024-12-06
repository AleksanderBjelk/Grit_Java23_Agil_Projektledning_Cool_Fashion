import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../CSS/productList.css";

function ProductList() {
    const [products, setProducts] = useState([]); //All products from the database
    const [productsToShow, setProductsToShow] = useState([]); //Products filtered by search
    const [editProductId, setEditProductId] = useState(null);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newStock, setNewStock] = useState("");
    const [newImages, setNewImages] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productsQuery = query(
                    productsCollection,
                    orderBy("createdAt", "desc")
                );
                const productSnapshot = await getDocs(productsQuery);
                const productList = productSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    stock: doc.data().stock,
                    images: doc.data().images,
                    createdAt: doc.data().createdAt,
                }));
                setProducts(productList);
                setProductsToShow(productList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const deleteFromDb = async (id) => {
        try {
            const productDoc = doc(db, "products", id);
            await deleteDoc(productDoc); //Delete the document

            const updatedProducts = products.filter(
                (product) => product.id !== id
            );
            setProducts(updatedProducts); //We need to set both here as the "products" need to be up to date with db
            setProductsToShow(updatedProducts);
            alert("Produkten har tagits bort.");
        } catch (error) {
            console.error("Error deleting product: ", error);
            alert("Lyckades inte ta bort produkten.");
        }
    };

    const handleSetAsFirst = async (productId, index) => {
        //Reorder images, putting the selected one at the beginning
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                const updatedImages = [
                    product.images[index], //Move the selected image to the first position
                    ...product.images.filter((_, i) => i !== index), //Add the remaining images
                ];
                return {
                    ...product,
                    images: updatedImages, //Update the images array
                };
            }
            return product;
        });

        setProducts(updatedProducts);
        setProductsToShow(updatedProducts);

        //Update Firestore with the new image order
        const productDoc = doc(db, "products", productId);
        try {
            await updateDoc(productDoc, {
                images: updatedProducts.find(
                    (product) => product.id === productId
                ).images,
            });
            alert("Produktbild har uppdaterats.");
        } catch (error) {
            console.error("Error updating product image order: ", error);
            alert("Kunde inte uppdatera produktbild.");
        }
    };

    const handleDeleteImage = async (productId, imageIndex) => {
        try {
            //Find the product by ID
            const product = products.find((product) => product.id === productId);
            if (!product) {
                alert("Produkten hittades inte.");
                return;
            }

            //Remove the selected image
            const updatedImages = product.images.filter((_, index) => index !== imageIndex);

            //Update the database
            const productDoc = doc(db, "products", productId);
            await updateDoc(productDoc, {
                images: updatedImages,
            });

            //Update the local state
            const updatedProducts = products.map((prod) =>
                prod.id === productId ? { ...prod, images: updatedImages } : prod
            );

            setProducts(updatedProducts);
            setProductsToShow(updatedProducts);
            alert("Bilden har tagits bort.");
        } catch (error) {
            console.error("Error deleting image: ", error);
            alert("Kunde inte ta bort bilden.");
        }
    };


    const handleProductUpdate = async (id) => {
        if (!newName && !newPrice && !newStock && !newImages) {
            alert("Inga ändringar har gjorts.");
            return;
        }

        const product = products.find((product) => product.id === id);
        if (!product) {
            alert("Produkten hittades inte.");
            return;
        }

        const updates = {};
        if (newName && newName !== product.name) {
            updates.name = newName;
        }
        if (newPrice && parseFloat(newPrice) !== product.price) {
            const priceValue = parseFloat(newPrice);
            if (isNaN(priceValue) || priceValue <= 0) {
                alert("Priset måste vara ett positivt nummer.");
                return;
            }
            updates.price = priceValue;
        }
        if (newStock && parseInt(newStock) !== product.stock) {
            const stockValue = parseInt(newStock);
            if (isNaN(stockValue)) {
                alert("Lagret måste vara ett nummer.");
                return;
            }
            updates.stock = stockValue;
        }
        if (newImages) {
            const existingImages = product.images || [];
            const newImagesArray = newImages.split(",").map((url) => url.trim());
            const combinedImages = [...existingImages, ...newImagesArray].slice(0, 5);

            if (JSON.stringify(combinedImages) !== JSON.stringify(existingImages)) {
                updates.images = combinedImages;
            }
        }

        if (Object.keys(updates).length === 0) {
            alert("Inga fält ändrades.");
            return;
        }

        const productDoc = doc(db, "products", id);
        try {
            await updateDoc(productDoc, updates);

            const updatedProducts = products.map((product) =>
                product.id === id ? { ...product, ...updates } : product
            );

            setProducts(updatedProducts);
            setProductsToShow(updatedProducts);
            setNewName("");
            setNewPrice("");
            setNewStock("");
            setNewImages("");
            setEditProductId(null);
            alert("Produkten har uppdaterats.");
        } catch (error) {
            console.error("Error", error);
            alert("Lyckades inte uppdatera produkten.");
        }
    };




    //Handle search input changes
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query) {
            //If the search is cleared, reset the display
            setProductsToShow(products);
        } else {
            //Filter the products based on the search query
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(query)
            );
            setProductsToShow(filteredProducts);
        }
    };

    return (
        <div className="product-list-container">
            <h1>Produktlista</h1>
            <div className="search-container">
                <FontAwesomeIcon
                    className="searchSymbol"
                    icon={faMagnifyingGlass}
                />
                <input
                    type="text"
                    placeholder="Sök..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="counter-container">
                <h3>Antal Produkter: {productsToShow.length}</h3>
            </div>
            <ul>
                {productsToShow.map((product, index) => (
                    <li key={product.id}>
                        <span>
                            {index + 1}. {product.name} <br />
                            SEK: {product.price} <br />
                            <span
                                style={{
                                    color:
                                        product.stock < 2 ? "red" : "inherit",
                                }}
                            >
                                Saldo: {product.stock}
                            </span>
                        </span>
                        {editProductId === product.id ? (
                            <div>
                                <input
                                    type="text"
                                    //value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Nytt Namn"
                                />
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setNewPrice(e.target.value)
                                    }
                                    placeholder="Nytt Pris"
                                />
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setNewStock(e.target.value)
                                    }
                                    placeholder="Nytt Saldo"
                                />
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setNewImages(e.target.value)
                                    }
                                    placeholder="Lägg till ny bild med URL"
                                />
                                <button
                                    onClick={() =>
                                        handleProductUpdate(product.id)
                                    }
                                >
                                    Uppdatera Produkten
                                </button>
                                <button onClick={() => setEditProductId(null)}>Ångra ändring</button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => {
                                        setEditProductId(product.id);
                                        setNewName(product.name);
                                        setNewPrice(product.price);
                                        setNewStock(product.stock);
                                        setNewImages(product.images.join(", "));
                                    }}
                                >
                                    Ändra
                                </button>
                                <button
                                    onClick={() => deleteFromDb(product.id)}
                                >
                                    Radera
                                </button>
                                <button
                                    onClick={() =>
                                        setProductsToShow((prev) =>
                                            prev.map((p) =>
                                                p.id === product.id
                                                    ? {
                                                        ...p,
                                                        showImages:
                                                            !p.showImages,
                                                    }
                                                    : p
                                            )
                                        )
                                    }
                                >
                                    {product.showImages
                                        ? "Göm Bilder"
                                        : "Visa Bilder"}
                                </button>
                                {product.showImages && (
                                    <div className="image-gallery">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img
                                                    src={image}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        border: index === 0 ? "2px solid blue" : "none",
                                                    }}
                                                    alt={`Produktbild ${index + 1}`}
                                                />
                                                <input
                                                    type="radio"
                                                    name={`firstImage-${product.id}`}
                                                    id={`firstImage-${index}`}
                                                    checked={index === 0}
                                                    onChange={() => handleSetAsFirst(product.id, index)}
                                                />
                                                <label htmlFor={`firstImage-${index}`}>Huvudbild</label>
                                                <button
                                                    onClick={() => handleDeleteImage(product.id, index)}
                                                    className="delete-image-button"
                                                >
                                                    Radera
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
