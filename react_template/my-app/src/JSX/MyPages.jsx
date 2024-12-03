import { Link } from "react-router-dom";
import Logout from "./Logout";
import '../CSS/mypages.css'; 

function MyPages() {

  return (
    <div className="page-container">
      <h1>Mina Sidor</h1>

        {/*visar bara länken om admin är inloggad */}
        {localStorage.getItem("isAdmin") === "true" && (
            <h1>
          <Link to="/adminpage" className="admin-link">
           Click here for Product Management
          </Link>
          </h1>
        )}

       {localStorage.getItem("isLoggedIn") === "true" ? (
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
