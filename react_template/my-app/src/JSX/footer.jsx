import '../CSS/footer.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';



function TestFooter() {
  return (
      <footer className="footer"> {/* Use <footer> for semantic HTML */}
          <div className="textFooter">
              <span className='location'>
                  <h3>Visit our locations</h3>
                  <p>Check out our store</p>
              </span>

              <span className='contact'>
                  <h3>Contact</h3>
                  <p>070 123 123</p>
                  <p>coolFashion@email.com</p>
              </span>

              <span className='sustainability'>
                  <h3>Sustainability</h3>
                  <p>Read more about how we stay sustainable</p>
              </span>

              <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF}/>{/* Facebook Icon */}
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />{/* Twitter Icon */}
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />{/* Instagram Icon */}
                  </a>
              </div>
          </div>
          </div>

          
      </footer>
  );
}

export default TestFooter;