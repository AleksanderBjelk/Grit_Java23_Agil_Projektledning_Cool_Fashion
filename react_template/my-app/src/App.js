import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import MainPage from "./JSX/main.jsx";
import TestFooter from "./JSX/footerComponents/footer.jsx";
import NavBar from "./JSX/navComponents/NavBar.jsx";
import Adminpage from "./JSX/adminComponents/adminpage.jsx";
import ProductList from "./JSX/adminComponents/ProductList.jsx";
import ResellPage from "./JSX/seconhandComponents/resellpage.jsx";
import Login from "./JSX/accountComponents/Login.jsx";
import ProductCard from "./JSX/productComponents/ProductCards.jsx";
import MyPages from "./JSX/footerComponents/MyPages.jsx";
import ProductPage from "./JSX/productComponents/ProductPage.jsx";
import ContactForm from "./JSX/footerComponents/contact.jsx";
import WishlistPage from "./JSX/accountComponents/WishlistPage.jsx";

    function App() {
        const [isAdmin, setIsAdmin] = useState(() => {
            return localStorage.getItem("isAdmin") || ""; //Retrieve from localStorage on load
        });
    
        useEffect(() => {
            localStorage.setItem("isAdmin", isAdmin); //Save to localStorage whenever it changes
        }, [isAdmin]);

        return (
            <Router>
                <div className="app">
                    <NavBar isAdmin={isAdmin} />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/contact" element={<ContactForm />} />
                            <Route path="/adminpage" element={<Adminpage />} />
                            <Route path="/productList" element={<ProductList />} />
                            <Route path="/resell" element={<ResellPage />} />
                            <Route
                                path="/login"
                                element={<Login setIsAdmin={setIsAdmin} />}
                            />
                            <Route
                                path="/mypages"
                                element={<MyPages isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
                            />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route
                                path="/category/:categoryId"
                                element={<ProductCard />}
                            />
                            <Route
                                path="/category/:categoryId/:intermediateId"
                                element={<ProductCard />}
                            />
                            <Route
                                path="/category/:categoryId/:intermediateId/:subId"
                                element={<ProductCard />}
                            />
                            <Route path="/product/:id" element={<ProductPage />} />
                        </Routes>
                    </div>
                    <TestFooter />
                </div>
            </Router>
        );
    }
    
    export default App;
