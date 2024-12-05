import "../../CSS/resell.css";
import SecondhandProductCard from "./SecondhandCards.jsx";

function ResellPage() {
    return (
        <div className="resell">
            <div className="header">
                <div className="content">
                <h1>Sälj dina kläder till våran second hand community</h1>
                <h3>
                    Håll vår planet i åtanke samtidigt som du tjänar pengar på
                    dina gamla kläder
                </h3>
            </div>
            <div className="cards">
                <SecondhandProductCard />
            </div>
            </div>
        </div>
    );
}
export default ResellPage;
