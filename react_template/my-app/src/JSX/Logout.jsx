import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; 
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import '../CSS/logout.css'; 

function Logout() {
  const [user, setUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);  
  const navigate = useNavigate();  
  const auth = getAuth();   
   const firestore = getFirestore();

   const handleLogout = async () => {
    try {
      await signOut(auth);  
      setUser(null); 
      setIsAdmin(false); 
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/login");
      alert("You have logged out");
    } catch (error) {
      console.error("Logout Error", error.message);
    }
  };


  return (
    <div>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
  )
};

export default Logout;
