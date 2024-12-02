import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import '../CSS/mypages.css';

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
