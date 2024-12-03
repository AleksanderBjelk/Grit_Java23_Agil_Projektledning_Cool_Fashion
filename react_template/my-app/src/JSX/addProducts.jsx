import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import "../CSS/productForm.css";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        images: [],
        mainCategory: "",
        intermediateCategory: "",
        subCategory: "",
        createdBy: "admin",
    });

    const [imageUrl, setImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [firstImageIndex, setFirstImageIndex] = useState(0);

    const [mainCategories, setMainCategories] = useState([]);
    const [intermediateCategories, setIntermediateCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    //hämta kategorier från Firestore
    useEffect(() => {
        const fetchCategories = async () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageAdd = () => {
        if (imageUrls.length <= 5) {
            setImageUrls([...imageUrls, imageUrl]);
            setImageUrl("");
        } else {
            alert("Cant add more than 5 images");
        }
    };

    const handleImageRemove = (index) => {
        const updatedImages = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedImages);

        //Adjust firstImageIndex if necessary
        if (index === firstImageIndex) {
            setFirstImageIndex(0); //Reset to the first image by default
        } else if (index < firstImageIndex) {
            setFirstImageIndex(firstImageIndex - 1);
        }
    };

    const handleSetAsFirst = (index) => {
        setFirstImageIndex(index); //Update the first image index
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const rearrangedImages = [
            imageUrls[firstImageIndex],
            ...imageUrls.filter((_, i) => i !== firstImageIndex),
        ];

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                images: rearrangedImages,
                createdAt: new Date(),
            };

            await addDoc(collection(db, "products"), productData);

            alert("Product successfully uploaded!");
            setFormData({
                name: "",
                price: "",
                stock: "",
                images: [],
                mainCategory: "",
                intermediateCategory: "",
                subCategory: "",
                createdBy: "admin",
            });
            setImageUrls([]);
            setFirstImageIndex(0);
        } catch (error) {
            console.error("Error uploading product: ", error);
            alert("Error uploading product. Please try again.");
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleProductSubmit} className="product-form">
                <h3>ADD A PRODUCT</h3>
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
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
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
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        marginRight: "10px",
                                    }}
                                />
                                <div>
                                    <input
                                        type="checkbox"
                                        name={`firstIndex-${index}`}
                                        id={`firstIndex-${index}`}
                                        checked={index === firstImageIndex}
                                        onChange={() => handleSetAsFirst(index)}
                                    />
                                    <label for={`firstIndex-${index}`}>
                                        Huvudbild
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(index)}
                                >
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
                <label>
                    Intermediate Category:
                    <select
                        name="intermediateCategory"
                        value={formData.intermediateCategory}
                        onChange={handleChange}
                    >
                        <option value="">Select Intermediate Category</option>
                        {intermediateCategories
                            .filter(
                                (cat) =>
                                    cat.mainCategoryId === formData.mainCategory
                            )
                            .map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Sub Category:
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories
                            .filter(
                                (cat) =>
                                    cat.intermediateCategoryId ===
                                    formData.intermediateCategory
                            )
                            .map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
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
        </div>
    );
};

export default ProductForm;
