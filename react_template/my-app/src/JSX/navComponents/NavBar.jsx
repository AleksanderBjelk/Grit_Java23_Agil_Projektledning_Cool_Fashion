import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../data/firebase";
import MainCategories from "./MainCategories.jsx";
import SearchBar from "./SearchBar.jsx";
import TopRightIcons from "./TopRightIcons.jsx";
import "../../CSS/nav.css";

const NavBar = ({ isAdmin }) => {
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesSnapshot = await getDocs(
                collection(db, "categories")
            );
            const categoriesData = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMainCategories(
                categoriesData.filter((cat) => cat.type === "mainCategory")
            );
            setIntermediateCategories(
                categoriesData.filter(
                    (cat) => cat.type === "intermediateCategory"
                )
            );
            setSubCategories(
                categoriesData.filter((cat) => cat.type === "subCategory")
            );
        };

        const fetchProducts = async () => {
            const productsSnapshot = await getDocs(collection(db, "products"));
            setProducts(
                productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        };

        fetchCategories();
        fetchProducts();
    }, []);
    

    return (
        <nav className="nav">
            <div className="logoImage">
                <a href="/">
                    <img src="/logoLarger.png" alt="Cool Fashion Logo" />
                </a>
            </div>

            <ul>
                {isAdmin === "true" && (
                    <li>
                        <a href="/adminpage">Admin Page</a>
                    </li>
                )}
                <li>
                    <a href="/resell">Second Hand</a>
                </li>
                <MainCategories
                    mainCategories={mainCategories}
                    intermediateCategories={intermediateCategories}
                    subCategories={subCategories}
                />
            </ul>
            <SearchBar products={products} mainCategories={mainCategories} />
            <TopRightIcons />
        </nav>
    );
};

export default NavBar;
