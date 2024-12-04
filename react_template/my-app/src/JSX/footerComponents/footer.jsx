import "../../CSS/footer.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function TestFooter() {
    return (
        <footer className="footer">
            <div className="textFooter">
                <span className="location">
                    <h3>Besök oss!</h3>
                    <p>Checka ut vår butik</p>
                </span>
                <span className="contact">
                    <Link to="/contact">Kontakt</Link>
                    <p>070 123 123</p>
                    <p>coolFashion@email.com</p>
                </span>
                <span className="mypages">
                    <Link to="/mypages">Mina Sidor</Link>
                </span>
                <span className="sustainability">
                    <h3>Hållbarhet</h3>
                    <p>Läs mer om hur vi håller oss hållbara</p>
                </span>
                <div className="footer-social">
                    <h4>Följ Oss</h4>
                    <div className="social-icons">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default TestFooter;
