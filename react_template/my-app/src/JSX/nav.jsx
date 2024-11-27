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

function TestNav() {
    const [mainCategories, setMainCategories] = useState([]);

    //hämtar huvudkategorier från Firebase
    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const categoriesSnapshot = await getDocs(
                    collection(db, "categories")
                );
                const mainCategoriesData = categoriesSnapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter((category) => category.type === "mainCategory");

                setMainCategories(mainCategoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchMainCategories();
    }, []);

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
                        {/* Statiska dropdownmenyer */}
                        <ul className="dropdown">
                            <li>
                                <a href={`/category/${mainCategory.id}/jeans`}>
                                    Jeans
                                </a>
                            </li>
                            <li>
                                <a href={`/category/${mainCategory.id}/shirts`}>
                                    Shirts
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`/category/${mainCategory.id}/hoodies`}
                                >
                                    Hoodies
                                </a>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
            <div className="topRightIcons">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faShoppingCart} />
            </div>
        </nav>
    );
}

export default TestNav;
