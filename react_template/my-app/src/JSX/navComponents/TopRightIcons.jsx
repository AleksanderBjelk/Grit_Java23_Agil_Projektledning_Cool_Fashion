import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TopRightIcons = () => {
  const navigate = useNavigate();

  // Funktion för att hantera klick på användar-ikon
  const handleUserIconClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
    if (isLoggedIn) {
      navigate("/mypages"); // Gå till användarsida om inloggad
    } else {
      navigate("/login"); // Annars, gå till login
    }
  };

  // Funktion för att hantera klick på hjärta-ikon (Wishlist)
  const handleHeartIconClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
    if (isLoggedIn) {
      navigate("/wishlist"); // Gå till wishlist om inloggad
    } else {
      alert("Logga in för att se din wishlist!"); // Visa alert om ej inloggad
    }
  };

  // Funktion för att hantera klick på varukorgs-ikon
  const handleCartIconClick = () => {
    navigate("/cart");
  };

  return (
    <div className="topRightIcons">
      <FontAwesomeIcon icon={faUser} onClick={handleUserIconClick} />
      <FontAwesomeIcon icon={faHeart} onClick={handleHeartIconClick} className="heart-icon" />
      <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartIconClick} />
    </div>
  );
};

export default TopRightIcons;