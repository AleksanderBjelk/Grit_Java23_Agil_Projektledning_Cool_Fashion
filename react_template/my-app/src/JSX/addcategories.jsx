import React, { useState } from "react";
import { db } from "../data/firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

const AddCategory = () => {
  const [mainCategory, setMainCategory] = useState("");
  const [intermediateCategory, setIntermediateCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  //Handle input changes
  const handleMainCategoryChange = (e) => setMainCategory(e.target.value);
  const handleIntermediateCategoryChange = (e) => setIntermediateCategory(e.target.value);
  const handleSubCategoryChange = (e) => setSubCategory(e.target.value);

  //Add Main Category
  const handleAddMainCategory = async (e) => {
    e.preventDefault();

    if (mainCategory) {
      try {
        const mainCategoryRef = doc(collection(db, "categories", "mainCategories"));
        await setDoc(mainCategoryRef, { category: mainCategory });

        setMainCategory("");
        alert("Main category added successfully!");
      } catch (error) {
        console.error("Error adding main category: ", error);
        alert("Failed to add main category.", error);
      }
    } else {
      alert("Please enter a main category.");
    }
  };

  //Add Intermediate Category
  const handleAddIntermediateCategory = async (e) => {
    e.preventDefault();

    if (intermediateCategory) {
      try {
        const intermediateCategoryRef = doc(collection(db, "categories", "intermediateCategories"));
        await setDoc(intermediateCategoryRef, { category: intermediateCategory });

        setIntermediateCategory("");
        alert("Intermediate category added successfully!");
      } catch (error) {
        console.error("Error adding intermediate category: ", error);
        alert("Failed to add intermediate category." + error);
      }
    } else {
      alert("Please enter an intermediate category.");
    }
  };

  //Add Sub Category
  const handleAddSubCategory = async (e) => {
    e.preventDefault();

    if (subCategory) {
      try {
        const subCategoryRef = doc(collection(db, "categories", "subCategories"));
        await setDoc(subCategoryRef, { category: subCategory });

        setSubCategory("");
        alert("Sub category added successfully!");
      } catch (error) {
        console.error("Error adding sub category: ", error);
        alert("Failed to add sub category.");
      }
    } else {
      alert("Please enter a sub category.");
    }
  };

  return (
    <div>
      <h3>Add Categories</h3>

      {/* Main Category Form */}
      <form onSubmit={handleAddMainCategory}>
        <label>
          Main Category:
          <input
            type="text"
            value={mainCategory}
            onChange={handleMainCategoryChange}
            required
          />
        </label>
        <button type="submit">Add Main Category</button>
      </form>

      {/* Intermediate Category Form */}
      <form onSubmit={handleAddIntermediateCategory}>
        <label>
          Intermediate Category:
          <input
            type="text"
            value={intermediateCategory}
            onChange={handleIntermediateCategoryChange}
            required
          />
        </label>
        <button type="submit">Add Intermediate Category</button>
      </form>

      {/* Sub Category Form */}
      <form onSubmit={handleAddSubCategory}>
        <label>
          Sub Category:
          <input
            type="text"
            value={subCategory}
            onChange={handleSubCategoryChange}
            required
          />
        </label>
        <button type="submit">Add Sub Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
