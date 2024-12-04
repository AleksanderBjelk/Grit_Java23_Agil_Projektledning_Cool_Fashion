import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import '../../CSS/mypages.css';

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
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
