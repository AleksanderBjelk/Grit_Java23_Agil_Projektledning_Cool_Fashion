import "../../CSS/resell.css";
import WishlistCard from "./WishlistCard";

function WishlistPage() {
    return (
        <div className="resell">
            <div className="header">
                <h1>Din Wishlist</h1>
            </div>
            <div className="cards">
                <WishlistCard/>
            </div>
        </div>
    );
}
export default WishlistPage;
