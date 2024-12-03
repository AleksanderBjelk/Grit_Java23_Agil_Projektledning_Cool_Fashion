import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import wishlistIcon from '../CSS/wishlistIcon.css'
import { db } from '../data/firebase'

const AddToWishlist = ({ productId }) => {
    const [isInWishlist, setIsInWishlist] = useState(false)

    //get userId from local storage (is first saved in login.jsx)
    const userId = localStorage.getItem('userId');

    console.log(userId)

    if (!userId) {
        console.log("no user is logged in to save an item to wishlist")
    }

    //firebase 
    //!! add error if product already exsist in the wishlist 
    const handleAddToWishList = async () => {
        try {
            const userDocRef = doc(db, 'Users', userId);
            const userDoc = await getDoc(userDocRef);


            if (userDoc.exists()) {
                const userData = userDoc.data();
                const wishlist = userData.wishlist || []; //creates a wishlist if it doesnt already exist (in array form)


                //check if productId already exists in the wishlist
                if (wishlist.includes(productId)) {
                    alert("This product is already in your wishlist!");
                    return; //wont if the item is already in the wishlist
                }

                wishlist.push(productId);
                await updateDoc(userDocRef, { wishlist })

                setIsInWishlist(true) //updating the state to true when an item is added to wishlist
                alert('Woho!! Product added to your wishlist')
                console.log("added product weith id " + productId)

            } else {
                console.error("User not found in Firestore.");
            }

        } catch (error) {
            console.error("error adding item to wishlist", error);
            alert('We are sorry.. an error occurred while adding the product to your wishlist.');
        }
    }

    return (
        <div className='wishListIcon' onClick={handleAddToWishList}>
            <FontAwesomeIcon icon={faHeart} />
        </div>
    )
}

export default AddToWishlist;