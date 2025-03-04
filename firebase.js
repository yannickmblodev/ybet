// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbsW5tZ2pI8DJHkL4u2g9Q_05Bgxg1ouo",
  authDomain: "ybet-8a899.firebaseapp.com",
  projectId: "ybet-8a899",
  storageBucket: "ybet-8a899.firebasestorage.app",
  messagingSenderId: "443433072535",
  appId: "1:443433072535:web:3c774d8231a4ebd44736d2",
  measurementId: "G-D7N6KS1D0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };