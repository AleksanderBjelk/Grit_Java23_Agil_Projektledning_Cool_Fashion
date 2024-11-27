// Import the functions you need from Firestore SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDH8UN3MxvPnF5BcEkhcMMa-Q1CLRaux_8",
  authDomain: "cool-fasion.firebaseapp.com",
  projectId: "cool-fasion",
  storageBucket: "cool-fasion.firebasestorage.app",
  messagingSenderId: "714858376781",
  appId: "1:714858376781:web:6b70feb24483ed5ec37604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore methods and references
export { db, collection, getDocs, addDoc, auth, onAuthStateChanged};
