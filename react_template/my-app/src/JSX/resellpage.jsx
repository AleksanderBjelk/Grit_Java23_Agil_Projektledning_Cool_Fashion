import "../CSS/resell.css";
import '../CSS/ProductCards.css';
import ProductCard from "./SecondhandCards.jsx";

function ResellPage() {
    return (
        <div className="resell">
            <div className="header">
                <h1>Re-sell your clothes to our second hand community</h1>
                <h3>Keep our planet in mind and while earning money on your old clothes</h3>
            </div>
            <div className="cards">
                <ProductCard />
            </div>
        </div>
    );

}
export default ResellPage;