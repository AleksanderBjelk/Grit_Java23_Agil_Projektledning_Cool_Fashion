import "../CSS/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faUser,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

//normalisera texten för att hantera sökningar med eller utan specialtecken (t.ex. "Levi's" och "Levis")
const normalizeText = (text) => {
    return text.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
};

function TestNav() {
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); //för att hålla koll på vad användaren skriver
    const [products, setProducts] = useState([]);

    //hämtar kategorier från Firebase
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesSnapshot = await getDocs(collection(db, "categories"));
                const categoriesData = categoriesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMainCategories(categoriesData.filter((category) => category.type === "mainCategory"));
                setIntermediateCategories(categoriesData.filter((category) => category.type === "intermediateCategory"));
                setSubCategories(categoriesData.filter((category) => category.type === "subCategory"));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const productsSnapshot = await getDocs(collection(db, "products"));
              const productsData = productsSnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              setProducts(productsData);
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };
  
      fetchProducts();
  }, []);

    const navigate = useNavigate();

    //funktion för att hantera sök
    const handleSearch = (event) => {
        setSearchQuery(event.target.value); //uppdatera sökfrågan vid varje tangenttryckning
    };

    const handleSearchSubmit = (event) => {
      event.preventDefault();
  
      const normalizedSearchQuery = normalizeText(searchQuery); 
  
      //sök i mainCategories, interC, subC och products
      const matchedMainCategory = mainCategories.find((category) =>
          normalizeText(category.name).includes(normalizedSearchQuery)
      );
  
      const matchedIntermediateCategory = intermediateCategories.find((category) =>
          normalizeText(category.name).includes(normalizedSearchQuery)
      );
  
      const matchedSubCategory = subCategories.find((category) =>
          normalizeText(category.name).includes(normalizedSearchQuery)
      );
  
      const matchedProduct = products.find((product) =>
          normalizeText(product.name).includes(normalizedSearchQuery)
      );
  
      //navigera till relevant kategori eller produkt baserat på resultatet
      if (matchedProduct) {
          navigate(`/product/${matchedProduct.id}`); 
      } else if (matchedMainCategory) {
          navigate(`/category/${matchedMainCategory.id}`);
      } else if (matchedIntermediateCategory) {
          navigate(`/category/${matchedIntermediateCategory.mainCategoryId}/${matchedIntermediateCategory.id}`);
      } else if (matchedSubCategory) {
          navigate(`/category/${matchedSubCategory.mainCategoryId}/${matchedSubCategory.intermediateCategoryId}/${matchedSubCategory.id}`);
      } else {
          alert("Ingen matchande produkt eller kategori hittades");
      }
  };

    const handleUserIconClick = () => {
        navigate('/login');
    };

    return (
        <nav className="nav">
            <div className="logoImage">
                <a href="/">
                    <img src="/logoLarger.png" alt="Cool Fashion Logo" />
                </a>
            </div>
            <ul>
                <li>
                    <a href="/resell">Second Hand</a>
                </li>
                {mainCategories.map((mainCategory) => (
                    <li key={mainCategory.id}>
                        <a href={`/category/${mainCategory.id}`}>
                            {mainCategory.name}
                        </a>
                        <ul className="dropdown">
                            {intermediateCategories
                                .filter((intermediateCategory) => intermediateCategory.mainCategoryId === mainCategory.id)
                                .map((intermediateCategory) => (
                                    <li key={intermediateCategory.id} className="intermediate-category">
                                        <a href={`/category/${mainCategory.id}/${intermediateCategory.id}`}>
                                            {intermediateCategory.name}
                                        </a>
                                        <ul className="sub-dropdown">
                                            {subCategories
                                                .filter(
                                                    (subCategory) =>
                                                        subCategory.intermediateCategoryId === intermediateCategory.id
                                                )
                                                .map((subCategory) => (
                                                    <li key={subCategory.id}>
                                                        <a href={`/category/${mainCategory.id}/${intermediateCategory.id}/${subCategory.id}`}>
                                                            {subCategory.name}
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="topRightIcons">
                <form onSubmit={handleSearchSubmit}>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input 
                            type="text" 
                            placeholder="Sök..." 
                            value={searchQuery} 
                            onChange={handleSearch} //uppdatera sökquery vid inmatning
                        />
                    </div>
                </form>
                <div onClick={handleUserIconClick} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div><FontAwesomeIcon icon={faHeart} /></div>
                <div><FontAwesomeIcon icon={faShoppingCart} /></div>
            </div>
        </nav>
    );
}

export default TestNav;