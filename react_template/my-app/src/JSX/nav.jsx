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

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
};

function NavBar({isAdmin}) {
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesSnapshot = await getDocs(
                    collection(db, "categories")
                );
                const categoriesData = categoriesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMainCategories(
                    categoriesData.filter(
                        (category) => category.type === "mainCategory"
                    )
                );
                setIntermediateCategories(
                    categoriesData.filter(
                        (category) => category.type === "intermediateCategory"
                    )
                );
                setSubCategories(
                    categoriesData.filter(
                        (category) => category.type === "subCategory"
                    )
                );
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await getDocs(
                    collection(db, "products")
                );
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

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredResults([]);
            return;
        }

        const normalizedQuery = normalizeText(query);

        const filteredProducts = products.filter((product) =>
            normalizeText(product.name).includes(normalizedQuery)
        );
        const filteredMainCategories = mainCategories.filter((category) =>
            normalizeText(category.name).includes(normalizedQuery)
        );
        const filteredIntermediateCategories = intermediateCategories.filter(
            (category) => normalizeText(category.name).includes(normalizedQuery)
        );
        const filteredSubCategories = subCategories.filter((category) =>
            normalizeText(category.name).includes(normalizedQuery)
        );

        const combinedResults = [
            ...filteredProducts,
            ...filteredMainCategories,
            ...filteredIntermediateCategories,
            ...filteredSubCategories,
        ];
        setFilteredResults(combinedResults.slice(0, 5));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const normalizedSearchQuery = normalizeText(searchQuery);

        const matchedProduct = products.find((product) =>
            normalizeText(product.name).includes(normalizedSearchQuery)
        );
        console.log("Matched Product:", matchedProduct);

        const matchedCategory = [
            ...mainCategories,
            ...intermediateCategories,
            ...subCategories,
        ].find((category) =>
            normalizeText(category.name).includes(normalizedSearchQuery)
        );
        console.log("Matched Category:", matchedCategory);

        if (matchedProduct) {
            navigate(`/product/${matchedProduct.id}`);
        } else if (matchedCategory) {
            if (matchedCategory.type === "mainCategory") {
                navigate(`/category/${matchedCategory.id}`);
            } else if (matchedCategory.type === "intermediateCategory") {
                navigate(
                    `/category/${matchedCategory.mainCategoryId}/${matchedCategory.id}`
                );
            } else if (matchedCategory.type === "subCategory") {
                navigate(
                    `/category/${matchedCategory.mainCategoryId}/${matchedCategory.intermediateCategoryId}/${matchedCategory.id}`
                );
            }
        } else {
            alert("No matching products or categories found.");
        }
    };

    const handleDropdownSelect = (item) => {
        setSearchQuery(item.name);
        setFilteredResults([]);
        handleSearchSubmit({ preventDefault: () => {} });
    };

    //user gets redirected to my pages if he clicks on the profile icon while logged in
    const handleUserIconClick = () => {
        const isAdmin = localStorage.getItem("isAdmin");  //check if 'isAdmin' is stored in localStorage
        const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';  //heck if the user is logged in
    
        console.log("admin status", isAdmin); 
        console.log("logged in", isLoggedIn);
    
        if (isLoggedIn) {
                navigate("/mypages");
        } else {
            navigate("/login");
        }
    };
        console.log("Admin status on page load:", localStorage.getItem("isAdmin")); //if you store admin status in localStorage
    
        console.log(isAdmin)

    return (
        <nav className="nav">
            <div className="logoImage">
                <a href="/">
                    <img src="/logoLarger.png" alt="Cool Fashion Logo" />
                </a>
            </div>
            <ul>
            {localStorage.getItem("isAdmin") && (
          <li><a href="/adminpage">Admin Page</a></li>
        )}
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
                                .filter(
                                    (intermediateCategory) =>
                                        intermediateCategory.mainCategoryId ===
                                        mainCategory.id
                                )
                                .map((intermediateCategory) => (
                                    <li
                                        key={intermediateCategory.id}
                                        className="intermediate-category"
                                    >
                                        <a
                                            href={`/category/${mainCategory.id}/${intermediateCategory.id}`}
                                        >
                                            {intermediateCategory.name}
                                        </a>
                                        <ul className="sub-dropdown">
                                            {subCategories
                                                .filter(
                                                    (subCategory) =>
                                                        subCategory.intermediateCategoryId ===
                                                        intermediateCategory.id
                                                )
                                                .map((subCategory) => (
                                                    <li key={subCategory.id}>
                                                        <a
                                                            href={`/category/${mainCategory.id}/${intermediateCategory.id}/${subCategory.id}`}
                                                        >
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
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearchSubmit(event);
                                }
                            }}
                        />
                        {filteredResults.length > 0 && (
                            <div className="dropdown-menu">
                                {filteredResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleDropdownSelect(result)
                                        }
                                    >
                                        <a href="#">{result.name}</a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
                <div
                    onClick={handleUserIconClick}
                    style={{ cursor: "pointer" }}
                >
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
