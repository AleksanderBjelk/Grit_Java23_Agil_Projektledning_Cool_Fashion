import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../../data/firebase";
import "../../CSS/productForm.css";

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
            try {
                const mainCategoryQuery = collection(db, "categories");
                const mainCategorySnapshot = await getDocs(
                    query(
                        mainCategoryQuery,
                        where("type", "==", "mainCategory")
                    )
                );
                const mainCategories = mainCategorySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const intermediateCategorySnapshot = await getDocs(
                    query(
                        mainCategoryQuery,
                        where("type", "==", "intermediateCategory")
                    )
                );
                const intermediateCategories =
                    intermediateCategorySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                const subCategorySnapshot = await getDocs(
                    query(mainCategoryQuery, where("type", "==", "subCategory"))
                );
                const subCategories = subCategorySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMainCategories(mainCategories);
                setIntermediateCategories(intermediateCategories);
                setSubCategories(subCategories);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
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

            alert("Produkt lyckades läggas till!");
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
            alert("Misslyckades lägga till produkt. Var snäll och prova igen.");
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleProductSubmit} className="product-form">
                <h3>LÄGG TILL EN PRODUKT</h3>
                <label>
                    Namn:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Pris:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Lagersaldo:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Bild URL:
                    <div>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                        />
                        <button type="button" onClick={handleImageAdd}>
                            Lägg till bild
                        </button>
                    </div>
                </label>
                {imageUrls.length > 0 && (
                    <div className="image-preview">
                        <h4>Bilder tillagda:</h4>
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
                                    Ta bort
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <label>
                    Huvudkategori:
                    <select
                        name="mainCategory"
                        value={formData.mainCategory}
                        onChange={handleChange}
                        required
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
                        name="intermediateCategory"
                        value={formData.intermediateCategory}
                        onChange={handleChange}
                    >
                        <option value="">Välj Mellanliggande Kategori</option>
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
                    Underkategori:
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                    >
                        <option value="">Välj Underkategori</option>
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
                    Skapad av:
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Skapa produkt</button>
            </form>
        </div>
    );
};

export default ProductForm;
