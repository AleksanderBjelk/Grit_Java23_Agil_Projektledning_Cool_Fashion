import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import "../../CSS/wishlistIcon.css";

const AddToWishlist = ({ productId }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    //get userId from local storage (is first saved in login.jsx)
    const userId = localStorage.getItem("userId");
    // console.log(userId)

    if (!userId) {
        console.log("no user is logged in to save an item to wishlist");
    }

    //firebase
    //!! add error if product already exsist in the wishlist
    const handleAddToWishList = async () => {
        try {
            const userDocRef = doc(db, "Users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const wishlist = userData.wishlist || []; //creates a wishlist if it doesnt already exist (in array form)

                //check if productId already exists in the wishlist
                if (wishlist.includes(productId)) {
                    alert("Den här produkten finns redan i din wishlist!");
                    return; //wont if the item is already in the wishlist
                }

                wishlist.push(productId);
                await updateDoc(userDocRef, { wishlist });

                setIsInWishlist(true); //updating the state to true when an item is added to wishlist
                alert("Woho!! Produkt lades till i din wishlist!");
                console.log("added product weith id " + productId);
            } else {
                console.error("User not found in Firestore.");
            }
        } catch (error) {
            console.error("error adding item to wishlist", error);
            alert(
                "Vi ber om ursäkt... Ett fel har skett med att lägga till produkten i din wishlist."
            );
        }
    };

    return (
        <div className="wishlistIcon" onClick={handleAddToWishList}>
            <FontAwesomeIcon icon={faHeart} />
        </div>
    );
};

export default AddToWishlist;
