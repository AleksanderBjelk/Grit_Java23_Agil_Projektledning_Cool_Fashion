import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; 
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import '../CSS/mypages.css'; 
import Logout from "./Logout";

function MyPages() {
  const [user, setUser] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);  
  const navigate = useNavigate();  
  const auth = getAuth();   
   const firestore = getFirestore();

  //hämtar inloggad user
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user); 
      fetchUserStatus(user.uid);  
    } else {
      setUser(null); 
    }
  }, [auth]);

  //hämtar statusen på user från firestore
  const fetchUserStatus = async (userId) => {
    try {
      const userDocRef = doc(firestore, "Users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const status = userDoc.data().status;
        if (status === "admin") {
          setIsAdmin(true); 
        } else {
          setIsAdmin(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user status", error);
    }
  };



  return (
    <div className="page-container">
      <h1>Mina Sidor</h1>

        {/*visar bara länken om admin är inloggad */}
        {isAdmin && (
            <h1>
          <Link to="/adminpage" className="admin-link">
           Click here for Product Management
          </Link>
          </h1>
        )}

       {user ? (
        <div>
          <Logout></Logout>
        </div>
      ) : (
        <p>Please log in to access your profile.</p>
      )} 
    </div>
  );
}

export default MyPages;
