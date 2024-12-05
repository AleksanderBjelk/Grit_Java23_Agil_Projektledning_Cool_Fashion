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
                    createdAt: doc.data().createdAt, // Include this if needed
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

    const handleProductUpdate = async (id) => {
        if (
            !newName ||
            !newPrice ||
            !newStock ||
            !newImages ||
            isNaN(newPrice) ||
            newPrice <= 0
        ) {
            alert("Lägg till namn, pris och bild");
            return;
        }
    
        //Fetch the existing images for the product
        const product = products.find((product) => product.id === id);
        if (!product) {
            alert("Produkten hittades inte.");
            return;
        }
    
        const existingImages = product.images || [];
        const newImagesArray = newImages.split(",").map((url) => url.trim());
    
        //Combine and limit to a maximum of 5 images
        let updatedImages = [...existingImages, ...newImagesArray];
        if (updatedImages.length > 5) {
            alert("Kan bara ha max 5 bilder.");
            updatedImages = updatedImages.slice(0, 5);
        }
    
        const productDoc = doc(db, "products", id);
        try {
            await updateDoc(productDoc, {
                name: newName,
                price: parseFloat(newPrice),
                stock: parseInt(newStock),
                images: updatedImages,
            });
    
            const updatedProducts = products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          name: newName,
                          price: parseFloat(newPrice),
                          stock: parseInt(newStock),
                          images: updatedImages,
                      }
                    : product
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
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Nytt Namn"
                                />
                                <input
                                    type="number"
                                    value={newPrice}
                                    onChange={(e) =>
                                        setNewPrice(e.target.value)
                                    }
                                    placeholder="Nytt Pris"
                                />
                                <input
                                    type="number"
                                    value={newStock}
                                    onChange={(e) =>
                                        setNewStock(e.target.value)
                                    }
                                    placeholder="Nytt Saldo"
                                />
                                <input
                                    type="text"
                                    value={newImages}
                                    onChange={(e) =>
                                        setNewImages(e.target.value)
                                    }
                                    placeholder="Ny bildaddress"
                                />
                                <button
                                    onClick={() =>
                                        handleProductUpdate(product.id)
                                    }
                                >
                                    Uppdatera Produkten
                                </button>
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
                                            <div
                                                key={index}
                                                className="image-item"
                                            >
                                                <img
                                                    src={image}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        border:
                                                            index === 0
                                                                ? "2px solid blue"
                                                                : "none", //Highlight the first image
                                                    }}
                                                />
                                                <input
                                                    type="radio"
                                                    name={`firstImage-${product.id}`}
                                                    id={`firstImage-${index}`}
                                                    checked={index === 0}
                                                    onChange={() =>
                                                        handleSetAsFirst(
                                                            product.id,
                                                            index
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`firstImage-${index}`}
                                                >
                                                    Huvudbild
                                                </label>
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
