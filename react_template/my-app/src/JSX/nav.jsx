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

function TestNav() {
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    //hämtar mainC, intermediateC kategorier och subC från Firebase
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

    const navigate = useNavigate();
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
                        {/* Dynamisk dropdown för interC  */}
                        <ul className="dropdown">
                            {intermediateCategories
                                .filter((intermediateCategory) => intermediateCategory.mainCategoryId === mainCategory.id)
                                .map((intermediateCategory) => (
                                    <li key={intermediateCategory.id} className="intermediate-category">
                                        <a href={`/category/${mainCategory.id}/${intermediateCategory.id}`}>
                                            {intermediateCategory.name}
                                        </a>
                                        {/* subC visas när man hovrar över interC */}
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
                <div><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
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