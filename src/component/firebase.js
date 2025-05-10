// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyB8YVAMYNsa8ZGZ7mYMAqaQsoQqydQIjfo",
    authDomain: "quizapp-f6a2c.firebaseapp.com",
    projectId: "quizapp-f6a2c",
    storageBucket: "quizapp-f6a2c.firebasestorage.app",
    messagingSenderId: "497998671383",
    appId: "1:497998671383:web:aeffa7428fad070562b652",
    measurementId: "G-C1QNWG8QNX"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
