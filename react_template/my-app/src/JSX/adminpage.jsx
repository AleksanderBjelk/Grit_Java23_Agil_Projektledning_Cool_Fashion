import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import CategoryForm from "./addcategories";
import '../CSS/adminpage.css'

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    images: [],
    mainCategory: "unisex",
    intermediateCategory: "tröjor",
    subCategory: "hoodies",
    createdBy: "user",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageAdd = () => {
    if (imageUrl) {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl("");
    }
  };

  const handleImageRemove = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: imageUrls, // Save image URLs
        createdAt: new Date(),
      };

      await addDoc(collection(db, "products"), productData);

      alert("Product successfully uploaded!");
      setFormData({
        name: "",
        price: "",
        images: [],
        mainCategory: "unisex",
        intermediateCategory: "tröjor",
        subCategory: "hoodies",
        createdBy: "user",
      });
      setImageUrls([]);
    } catch (error) {
      console.error("Error uploading product: ", error);
      alert("Error uploading product. Please try again.");
    }
  };

  return (
    <div>
    <form onSubmit={handleProductSubmit} className="product-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image URL:
        <div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <button type="button" onClick={handleImageAdd}>
            Add Image
          </button>
        </div>
      </label>

      {imageUrls.length > 0 && (
        <div className="image-preview">
          <h4>Added Images:</h4>
          {imageUrls.map((url, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
              <button type="button" onClick={() => handleImageRemove(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <label>
        Main Category:
        <select
          name="mainCategory"
          value={formData.mainCategory}
          onChange={handleChange}
        >
          <option value="unisex">Unisex</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </label>

      <label>
        Intermediate Category:
        <select
          name="intermediateCategory"
          value={formData.intermediateCategory}
          onChange={handleChange}
        >
          <option value="tröjor">Tröjor</option>
          <option value="byxor">Byxor</option>
          <option value="jackor">Jackor</option>
        </select>
      </label>

      <label>
        Sub Category:
        <select
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
        >
          <option value="hoodies">Hoodies</option>
          <option value="sweatshirts">Sweatshirts</option>
          <option value="cardigans">Cardigans</option>
        </select>
      </label>

      <label>
        Created By:
        <input
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    <CategoryForm/>
    </div>
  );
};

export default ProductForm;
