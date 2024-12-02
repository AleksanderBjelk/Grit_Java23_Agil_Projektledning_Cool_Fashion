import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import '../CSS/mypages.css'; 

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
      //useStates?
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/login");
      alert("You have logged out");
    } catch (error) {
      console.error("Logout Error", error.message);
    }
  };


  return (
    <div className="page-container">
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
  )
};

export default Logout;
