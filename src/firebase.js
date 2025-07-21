import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore'u ekle

const firebaseConfig = {
  apiKey: "AIzaSyAsRG5cRjH3ffiS7j6fZqcCAaGg-uGpvvk",
  authDomain: "evently-be8d9.firebaseapp.com",
  projectId: "evently-be8d9",
  storageBucket: "evently-be8d9.firebasestorage.app",
  messagingSenderId: "448412398583",
  appId: "1:448412398583:web:b54bbca5ce3ed0abc4f4f2",
  measurementId: "G-ZRT16J9CTC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Firestore instance'ı

export { auth, provider, signInWithPopup, db }; // db'yi de export et