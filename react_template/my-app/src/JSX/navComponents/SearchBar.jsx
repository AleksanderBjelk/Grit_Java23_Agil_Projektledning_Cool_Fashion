import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../data/firebase";
import { collection, getDocs } from "firebase/firestore";

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
};

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();

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
            alert("Ingen match på kategorier eller produkter");
        }
    };

    const handleDropdownSelect = (item) => {
        setSearchQuery(item.name);
        setFilteredResults([]);
        handleSearchSubmit({ preventDefault: () => {} });
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Sök..."
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
                            onClick={() => handleDropdownSelect(result)}
                        >
                            <a href="#">{result.name}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
