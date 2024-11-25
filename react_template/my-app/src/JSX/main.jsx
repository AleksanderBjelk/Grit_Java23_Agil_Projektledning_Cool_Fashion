import "../CSS/main.css";
import TestCards from "../JSX/ProductGridCarousel.jsx";


function testMain() {
    return (
        <div className="main">
            <div className="frontPagePicture">
             <img src="/media/startbild.png" alt="Example" />
            </div>
            <div className="upperMainText">
                <h1>START OFF WINTER WITH NEW HOODIES</h1>
            </div>
            <TestCards />
            <div className="lowerMainTextContainer">
                <div className="lowerMainText">
                    <h2>OUTLET SALE UNTIL 24/11</h2>
                    <h2>FREE DELIVERY TO STORE</h2>
                    <h2>1-4 DAY DELIVERY</h2>
                </div>
            </div>
            <div className="saleImage">
                <a href="sale.com">
                    <img src="/media/blackFriday.png" alt="Black Friday Sale" />
                </a>
            </div>
        </div>
    );
}
export default testMain;
