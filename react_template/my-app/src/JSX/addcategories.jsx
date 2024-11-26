import React, { useState, useEffect } from "react";
import { db } from "../data/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import '../CSS/productForm.css'

const AddCategory = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [intermediateCategories, setIntermediateCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [mainCategory, setMainCategory] = useState("");
  const [intermediateCategory, setIntermediateCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("mainCategory");

  
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const allCategories = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMainCategories(allCategories.filter(cat => cat.type === "mainCategory"));
      setIntermediateCategories(allCategories.filter(cat => cat.type === "intermediateCategory"));
      setSubCategories(allCategories.filter(cat => cat.type === "subCategory"));
    };

    fetchCategories();
  }, []);


  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleCategoryTypeChange = (e) => setCategoryType(e.target.value);
  const handleMainCategoryChange = (e) => setMainCategory(e.target.value);
  const handleIntermediateCategoryChange = (e) => setIntermediateCategory(e.target.value);


//lägga till kategori
const handleAddCategory = async (e) => {
  e.preventDefault();

  if (!categoryName.trim()) {
    alert("Please enter a category name.");
    return;
  }

  try {
    let categoryData = { name: categoryName };

    //lägga till relationerr beroende på kategori
    if (categoryType === "intermediateCategory" && mainCategory) {
      categoryData.mainCategoryId = mainCategory;
    } else if (categoryType === "subCategory" && intermediateCategory) {
      categoryData.intermediateCategoryId = intermediateCategory;
    }

    //spara till Firestore
    const categoryRef = collection(db, "categories");
    const newCategory = await addDoc(categoryRef, { ...categoryData, type: categoryType });

    //uppdatera tillståndet direkt med den nya kategorin
    const newCategoryData = { id: newCategory.id, ...categoryData, type: categoryType };

    if (categoryType === "mainCategory") {
      setMainCategories(prev => [...prev, newCategoryData]);
    } else if (categoryType === "intermediateCategory") {
      setIntermediateCategories(prev => [...prev, newCategoryData]);
    } else if (categoryType === "subCategory") {
      setSubCategories(prev => [...prev, newCategoryData]);
    }

    //återställ fält och visa feedbackeen
    setCategoryName("");
    if (categoryType !== "mainCategory") setMainCategory("");
    if (categoryType === "subCategory") setIntermediateCategory("");
    alert(`${categoryType} category added successfully!`);
  } catch (error) {
    console.error("Error adding category:", error);
    alert("Failed to add category. Please try again.");
  }
};

  return (
    <div className="form-wrapper">
      <form onSubmit={handleAddCategory} className="category-form ">
      <h3>Add a Category</h3>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
          />
        </label>

        <label>
          Category Type:
          <select
            value={categoryType}
            onChange={handleCategoryTypeChange}
            required
          >
            <option value="mainCategory">Main Category</option>
            <option value="intermediateCategory">Intermediate Category</option>
            <option value="subCategory">Sub Category</option>
          </select>
        </label>

        {/* Om Intermediate Category väljs, visa Main Category */}
        {categoryType === "intermediateCategory" && (
          <label>
            Main Category:
            <select
              value={mainCategory}
              onChange={handleMainCategoryChange}
              required
            >
              <option value="">Select Main Category</option>
              {mainCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Om Sub Category väljs, visa Intermediate Category */}
        {categoryType === "subCategory" && (
          <label>
            Intermediate Category:
            <select
              value={intermediateCategory}
              onChange={handleIntermediateCategoryChange}
              required
            >
              <option value="">Select Intermediate Category</option>
              {intermediateCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;