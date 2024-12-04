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
           Klicka Här För Produkt Hantering
          </Link>
          </h1>
        )}

       {localStorage.getItem("isLoggedIn") === "true" ? (
        <div>
          <Logout></Logout>
        </div>
      ) : (
        <p>Var Snäll Och Logga In För Att Komma Åt Din Profil.</p>
      )} 
    </div>
  );
}

export default MyPages;
