import { Link } from "react-router-dom";
import Logout from "./Logout";
import '../CSS/mypages.css'; 

function MyPages() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const isAdmin = localStorage.getItem("isAdmin")

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

       {isLoggedIn ? (
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
