// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGFrSWkhxa4Y-Cpq-kCMbfQH8DzUnnCZM",
  authDomain: "taller-react-crud.firebaseapp.com",
  projectId: "taller-react-crud",
  storageBucket: "taller-react-crud.appspot.com",
  messagingSenderId: "696053115269",
  appId: "1:696053115269:web:e0dffefebc7e60b57bfcec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}