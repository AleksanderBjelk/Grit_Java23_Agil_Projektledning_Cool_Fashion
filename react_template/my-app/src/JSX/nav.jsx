import '../CSS/nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function TestNav() {
  return (
    <nav className="nav">
      <h1 id="headertext">
        <a href="/">
          <span className="cool">Cool</span>{' '}
          <span className="fashion">Fashion®</span>
        </a>
      </h1>
      <ul>
        <li>
          <a href="/kepsar">Kepsar</a>
          </li>
            <li><a href="/tjejer">Tjejer</a>
            <ul className="dropdown">
            <li><a href="/jeans">Jeans</a></li>
            <li><a href="/shirts">Shirts</a></li>
            <li><a href="/hoodies">Hoodies</a></li>
          </ul></li>
            <li><a href="/killar">Killar</a>
            <ul className="dropdown">
            <li><a href="/jeans">Jeans</a></li>
            <li><a href="/shirts">Shirts</a></li>
            <li><a href="/hoodies">Hoodies</a></li>
          </ul></li>
            <li><a href="/unisex">Unisex</a>
            <ul className="dropdown">
            <li><a href="/jeans">Jeans</a></li>
            <li><a href="/shirts">Shirts</a></li>
            <li><a href="/hoodies">Hoodies</a></li>
          </ul></li>
            <li><a href="/barn">Barn</a>
            <ul className="dropdown">
            <li><a href="/jeans">Jeans</a></li>
            <li><a href="/shirts">Shirts</a></li>
            <li><a href="/hoodies">Hoodies</a></li>
          </ul>
           </li>
          </ul>
<div className="topRightIcons">
<FontAwesomeIcon icon={faMagnifyingGlass} />
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faShoppingCart} />
</div>
         


      </nav>
  );
}

export default TestNav;
