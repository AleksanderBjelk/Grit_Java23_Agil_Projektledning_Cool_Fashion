import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import TestMain from './JSX/main.jsx';
import TestFooter from './JSX/footer.jsx';
import TestNav from './JSX/nav.jsx';
import TestContact from './JSX/contact.jsx';
import Adminpage from './JSX/adminpage.jsx';
import ProductList from './JSX/ProductList.jsx';
import ResellPage from "./JSX/resellpage.jsx";
import Login from "./JSX/Login.jsx";
import ProductCard from "./JSX/ProductCards.jsx";
import MyPages from "./JSX/MyPages.jsx"
import ProductPage from "./JSX/ProductPage.jsx"

function App() {
  const [isAdmin, setIsAdmin] = useState(false); //trackar om det är admin el user

  return (
    <Router>
      <div className="App">
        <TestNav isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<TestMain />} />
          <Route path="/contact" element={<TestContact />} /> {/* Contact-route */}
          <Route path="/adminpage" element={<Adminpage setIsAdmin={setIsAdmin}/>} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/resell" element={<ResellPage setIsAdmin={setIsAdmin}/>} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/mypages" element={<MyPages setIsAdmin={setIsAdmin}/>} />
          <Route path="/category/:categoryId" element={<ProductCard setIsAdmin={setIsAdmin}/>} />
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
