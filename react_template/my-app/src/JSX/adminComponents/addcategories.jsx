import React, { useState, useEffect } from "react";
import { db } from "../../data/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../../CSS/productForm.css";


const AddCategory = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [mainCategory, setMainCategory] = useState("");
    const [intermediateCategory, setIntermediateCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryType, setCategoryType] = useState("mainCategory");

    //hämta kategorier från Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            if (mainCategories.length && intermediateCategories.length) {
                //Kollar om den redan är populerad
                return;
            }
            const categoriesSnapshot = await getDocs(
                collection(db, "categories")
            );
            const allCategories = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMainCategories(
                allCategories.filter((cat) => cat.type === "mainCategory")
            );
            setIntermediateCategories(
                allCategories.filter(
                    (cat) => cat.type === "intermediateCategory"
                )
            );
            setSubCategories(
                allCategories.filter((cat) => cat.type === "subCategory")
            );
        };

        fetchCategories();
    }, []);

    const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
    const handleCategoryTypeChange = (e) => setCategoryType(e.target.value);
    const handleMainCategoryChange = (e) => setMainCategory(e.target.value);
    const handleIntermediateCategoryChange = (e) =>
        setIntermediateCategory(e.target.value);

    //lägg till kategori
    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Var snäll och skriv ett kategorinamn.");
            return;
        }

        try {
            let categoryData = { name: categoryName };

            //lägg till relationer beroende på kategori
            if (categoryType === "intermediateCategory" && mainCategory) {
                categoryData.mainCategoryId = mainCategory;
            } else if (categoryType === "subCategory" && intermediateCategory) {
                categoryData.intermediateCategoryId = intermediateCategory;
            }

            //spara till Firestore
            const categoryRef = collection(db, "categories");
            const newCategory = await addDoc(categoryRef, {
                ...categoryData,
                type: categoryType,
            });

            //uppdatera tillståndet direkt med den nya kategorin
            const newCategoryData = {
                id: newCategory.id,
                ...categoryData,
                type: categoryType,
            };

            if (categoryType === "mainCategory") {
                setMainCategories((prev) => [...prev, newCategoryData]);
            } else if (categoryType === "intermediateCategory") {
                setIntermediateCategories((prev) => [...prev, newCategoryData]);
            } else if (categoryType === "subCategory") {
                setSubCategories((prev) => [...prev, newCategoryData]);
            }

            //återställ fält och visa feedback
            setCategoryName("");
            setMainCategory("");
            setIntermediateCategory("");
            alert(`${categoryType} Kategori lade till lyckat!`);
        } catch (error) {
            console.error("Error adding category:", error);
            alert(
                "Misslyckades med att lägga till kategori. Var snäll att prova igen."
            );
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleAddCategory} className="category-form">
                <h3>lägg till en kategori</h3>
                <label>
                    Kategorinamn:
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        required
                    />
                </label>
                <label>
                    Kategorityp:
                    <select
                        value={categoryType}
                        onChange={handleCategoryTypeChange}
                        required
                    >
                        <option value="mainCategory">Huvudkategori</option>
                        <option value="intermediateCategory">
                            Mellanliggande Kategori
                        </option>
                        <option value="subCategory">Underkategori</option>
                    </select>
                </label>
                <label>
                    Huvudkategori:
                    <select
                        value={mainCategory}
                        onChange={handleMainCategoryChange}
                        disabled={categoryType === "mainCategory"}
                    >
                        <option value="">Välj Huvudkategori</option>
                        {mainCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Mellanliggande Kategori:
                    <select
                        value={intermediateCategory}
                        onChange={handleIntermediateCategoryChange}
                        disabled={categoryType !== "subCategory"}
                    >
                        <option value="">Välj Mellanliggande Kategori</option>
                        {intermediateCategories
                            .filter(
                                (cat) => cat.mainCategoryId === mainCategory
                            )
                            .map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>
                </label>
                <button type="submit">Lägg till kategori</button>
            </form>
        </div>
    );
};

export default AddCategory;
