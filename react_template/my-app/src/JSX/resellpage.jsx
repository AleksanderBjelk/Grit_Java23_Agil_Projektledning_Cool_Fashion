import "../CSS/resell.css";
import SecondhandProductCard from "./SecondhandCards.jsx";

function ResellPage() {
    return (
        <div className="resell">
            <div className="header">
                <h1>Re-sell your clothes to our second hand community</h1>
                <h3>Keep our planet in mind and while earning money on your old clothes</h3>
            </div>
            <div className="cards">
                <SecondhandProductCard />
            </div>
        </div>
    );

}
export default ResellPage;