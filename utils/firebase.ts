// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjm9y_9fPG4yUpDRu32MADfDxesplsAG8",
  authDomain: "art-music-4a503.firebaseapp.com",
  projectId: "art-music-4a503",
  storageBucket: "art-music-4a503.firebasestorage.app",
  messagingSenderId: "642091179777",
  appId: "1:642091179777:web:993751c32d7383249f8500",
  measurementId: "G-QZ9ZSBJ6D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
