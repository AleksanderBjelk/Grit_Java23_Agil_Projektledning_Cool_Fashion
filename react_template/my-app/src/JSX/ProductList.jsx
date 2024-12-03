import { collection, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../CSS/productList.css';

function ProductList() {
  const [products, setProducts] = useState([]); //All products from the database
  const [productsToShow, setProductsToShow] = useState([]); //Products filtered by search
  const [editProductId, setEditProductId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImages, setNewImages] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsQuery = query(productsCollection, orderBy("createdAt", "desc"));
        const productSnapshot = await getDocs(productsQuery);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
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

      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts); //We need to set both here as the "products" need to be up to date with db
      setProductsToShow(updatedProducts);
      alert("Produkten har tagits bort.");
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Lyckades inte ta bort produkten.");
    }
  };

  const handleProductUpdate = async (id) => {
    if (!newName || !newPrice || !newImages || isNaN(newPrice) || newPrice <= 0) {
      alert('Lägg till namn, pris och bild');
      return;
    }

    const productDoc = doc(db, "products", id);
    try {
      await updateDoc(productDoc, {
        name: newName,
        price: parseFloat(newPrice),
        images: newImages,
      });

      const updatedProducts = products.map((product) =>
        product.id === id
          ? { ...product, name: newName, price: parseFloat(newPrice), images: newImages }
          : product
      );

      setProducts(updatedProducts);
      setProductsToShow(updatedProducts);
      setNewName('');
      setNewPrice('');
      setNewImages('');
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
      <h1>Product List</h1>
      <div className="search-container">
        <FontAwesomeIcon className="searchSymbol" icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Sök..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {productsToShow.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} <br />
              SEK: {product.price}
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
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Nytt Pris"
                />
                <input
                  type="text"
                  value={newImages}
                  onChange={(e) => setNewImages(e.target.value)}
                  placeholder="Ny bildaddress"
                />
                <button onClick={() => handleProductUpdate(product.id)}>
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
                    setNewImages(product.images.join(", "));
                  }}
                >
                  Ändra
                </button>
                <button onClick={() => deleteFromDb(product.id)}>Radera</button>
                <button
                  onClick={() =>
                    setProductsToShow((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, showImages: !p.showImages }
                          : p
                      )
                    )
                  }
                >
                  {product.showImages ? "Hide Images" : "Show Images"}
                </button>
                {product.showImages && (
                  <div className="image-gallery">
                    {product.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Product Image ${idx + 1}`}
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
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
