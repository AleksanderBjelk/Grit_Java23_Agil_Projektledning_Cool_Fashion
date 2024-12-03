import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import MainPage from './JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import NavBar from './JSX/nav.jsx';
import Adminpage from './JSX/adminpage.jsx';
import ProductList from './JSX/ProductList.jsx';
import ResellPage from "./JSX/resellpage.jsx";
import Login from "./JSX/Login.jsx";
import ProductCard from "./JSX/ProductCards.jsx";
import MyPages from "./JSX/MyPages.jsx"
import ProductPage from "./JSX/ProductPage.jsx"
import ContactForm from "./JSX/contact.jsx";
import WishlistPage from "./JSX/wishlist.jsx";

function App() {
  //Vi vill setta denna på /login och kolla den i TestNav(/nav.jsx) kanske även på /mypages? Kollar man med Mats så tycker han man ska använda nån slags kombination.. Setta den i localStorage vid inloggning
  //och sen använda och setta usetstates i de komponenter där vi behöver använda isAdmin.
  const [isAdmin, setIsAdmin] = useState(false); //trackar om det är admin el user

  return (
    <Router>
      <div className="App">
        <NavBar isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/adminpage" element={<Adminpage/>} />
          <Route path="/productList" element={<ProductList/>} />
          <Route path="/resell" element={<ResellPage/>} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin}/>} />
          <Route path="/mypages" element={<MyPages isAdmin={isAdmin}/>} />
          <Route path="/wishlist" element={<WishlistPage/>} />
          <Route path="/category/:categoryId" element={<ProductCard/>} />
          <Route path="/category/:categoryId/:intermediateId" element={<ProductCard />} />
          <Route path="/category/:categoryId/:intermediateId/:subId" element={<ProductCard />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <TestFooter />
      </div>
    </Router>
  );
}

export default App;
