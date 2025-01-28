// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjm9y_9fPG4yUpDRu32MADfDxesplsAG8",
  authDomain: "art-music-4a503.firebaseapp.com",
  projectId: "art-music-4a503",
  storageBucket: "art-music-4a503.firebasestorage.app",
  messagingSenderId: "642091179777",
  appId: "1:642091179777:web:993751c32d7383249f8500",
  measurementId: "G-QZ9ZSBJ6D6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
