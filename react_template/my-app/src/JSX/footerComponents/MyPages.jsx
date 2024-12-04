import { Link } from "react-router-dom";
import Logout from "../accountComponents/Logout";
import "../../CSS/mypages.css";

function MyPages() {
    return (
        <div className="page-container">
            <h1>Mina Sidor</h1>

            {/*visar bara länken om admin är inloggad */}
            {localStorage.getItem("isAdmin") === "true" && (
                <h1>
                    <Link to="/adminpage" className="admin-link">
                        Klicka här för produkt hantering
                    </Link>
                </h1>
            )}

            {localStorage.getItem("isLoggedIn") === "true" ? (
                <div>
                    <Logout></Logout>
                </div>
            ) : (
                <p>Var snäll och logga in för att komma åt din profil.</p>
            )}
        </div>
    );
}

export default MyPages;
