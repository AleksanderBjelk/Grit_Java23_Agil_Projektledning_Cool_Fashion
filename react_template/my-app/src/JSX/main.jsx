import "../CSS/main.css";
import ProductGridCarousel from "../JSX/ProductGridCarousel.jsx";

function MainPage() {
    return (
        <div className="main">
            <video id="video" loop muted autoPlay controls>
                <source
                    src="/media/startvideo.mp4"
                    alt="Video på kläder butiken erbjuder för jul"
                    type="video/mp4"
                ></source>
                <source
                    src="/media/startvideo.webm"
                    alt="Video på kläder butiken erbjuder för jul"
                    type="video/webm"
                ></source>
            </video>
            {/* <div className="frontPagePicture">
                <img src="/media/startbild4.png" alt="Example" />
                <div>
                    <h1 className="slogan-text">Make a statement out of yourself</h1>
                </div>
            </div>  */}
            <div className="upperMainText">
                <h1>NEW IN WINTER SEASON</h1>
            </div>
            <ProductGridCarousel />
            <div className="lowerMainTextContainer">
                <div className="lowerMainText">
                    <h2>OUTLET SALE UNTIL 24/12</h2>
                    <h2>FREE DELIVERY TO STORE</h2>
                    <h2>1-4 DAY DELIVERY</h2>
                </div>
            </div>
            <div className="saleImage">
                <a href="sale.com">
                    <img src="/media/christmas.png" alt="Christmas Banner" />
                </a>
            </div>
        </div>
    );
}
export default MainPage;
