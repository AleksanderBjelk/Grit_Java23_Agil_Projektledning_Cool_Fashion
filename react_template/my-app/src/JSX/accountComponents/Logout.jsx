import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import '../../CSS/mypages.css';

function Logout({setIsAdmin}) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async (e) => {
    
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
      setIsAdmin("")
      navigate("/login");
      alert("Du har loggat ut");
    } catch (error) {
      console.error("Logout Error", error.message);
    }
  };


  return (
    <div>
      <button onClick={handleLogout} className="logout-button">Logga Ut</button>
    </div>
  )
};

export default Logout;
