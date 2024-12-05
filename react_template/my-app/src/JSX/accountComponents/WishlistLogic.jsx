import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../data/firebase";
import "../../CSS/wishlistIcon.css";

const AddToWishlist = ({ productId }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    //hämtar userid från local storage
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                if (userId) {
                    const userDocRef = doc(db, "Users", userId);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const wishlist = userDoc.data().wishlist || [];
                        setIsInWishlist(wishlist.includes(productId));
                    }
                }
            } catch (error) {
                console.error("Error att kolla wishlist status", error);
            }
        };

        checkWishlistStatus();
    }, [userId, productId]);

    if (!userId) {
        console.log("no user is logged in to save an item to wishlist");
    }

    const handleWishListClick = async () => {
        try {
            const userDocRef = doc(db, "Users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const wishlist = userData.wishlist || []; //skapar wishlist i array form

                if (isInWishlist) {
                    //fråga användaren om den är säker på att den vill ta bort item från WL
                    const isConfirmed = window.confirm("Är du säker på att du vill ta bort produkten från din wishlist?");
                    if (isConfirmed) {
                        //tar bort produkten från wishlistan
                        const updatedWishlist = wishlist.filter(item => item !== productId);
                        await updateDoc(userDocRef, { wishlist: updatedWishlist });

                        setIsInWishlist(false); //uppdaterar state
                        alert("Produkten är borttagen från wishlistan");
                    } else {
                        console.log("Produkten inte borttagen");
                    }
                    }else {
                        //kollar om produckt redan finns i wishlist
                        if (wishlist.includes(productId)) {
                            alert("Den här produkten finns redan i din wishlist!");
                            return;
                        }

                        wishlist.push(productId);
                        await updateDoc(userDocRef, { wishlist });

                        setIsInWishlist(true); //uppdaterar till sant on den är i wishlistan
                        alert("Woho!! Produkten lades till i din wishlist!");
                    }
                } else {
                    console.error("Hittade inte användare i firestore");
                }
            } catch (error) {
                console.error("det gick inte att lägga till item i wishlistan", error);
                alert(
                    "Vi ber om ursäkt... Ett fel har skett med att lägga till produkten i din wishlist."
                );
            }
        };

        return (
            <div className={`wishlistIcon ${isInWishlist ? "wishlistIcon-active" : ""}`} //aktiv eller ej aktiv state ändrar css style på hjärtat
                onClick={handleWishListClick}
            >            <FontAwesomeIcon icon={isInWishlist ? faHeartSolid : faHeartRegular} />
            </div>
        );
    };

    export default AddToWishlist;
