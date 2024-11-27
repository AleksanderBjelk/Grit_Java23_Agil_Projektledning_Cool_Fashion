import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import "../CSS/contact.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                createdAt: new Date(),
            };

            await addDoc(collection(db, "contactform"), productData);

            alert("Product successfully uploaded!");
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (error) {
            console.error("Error uploading form: ", error);
            alert("Error uploading form. Please try again.");
        }
    };

    return (
        <div className="textContact">
            <div className="upperMainTextContact">
                <h1>Contact us</h1>
            </div>
            <div className="mainContact">
                <div className="formContainer">
                    <form action="" className="contactForm" onSubmit={handleFormSubmit}>
                        <h2>Skriv till oss!</h2>
                        <div className="formGroup">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write your message"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="buttonContainer">
                            <button type="submit" className="submitButton">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mapContainer">
                    <h1>Här finns vi:</h1>
                    <iframe
                        title="Find us"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18030.439421020073!2d12.971701622808776!3d55.60540860298138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3e3fcbe6f9d%3A0x4fea1c7223ed64c0!2sPolisen%20Malm%C3%B6%20%E2%80%93%20Porslinsgatan!5e0!3m2!1ssv!2sse!4v1696252546185!5m2!1ssv!2sse"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        id="karta"
                    />
                </div>
            </div>
        </div>
    );
}
export default ContactForm;