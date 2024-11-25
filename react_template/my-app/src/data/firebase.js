// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = getFirestore(app);

export { db };