// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

  // apiKey: "AIzaSyAEuMNdWHvcyzq9l8tnFJr9C9PMW7AYka0",
  // authDomain: "taskmanagement-ab326.firebaseapp.com",
  // databaseURL: "https://taskmanagement-ab326-default-rtdb.firebaseio.com",
  // projectId: "taskmanagement-ab326",
  // storageBucket: "taskmanagement-ab326.firebasestorage.app",
  // messagingSenderId: "530780194389",
  // appId: "1:530780194389:web:a18a3904551448b0de76dc",
  // measurementId: "G-FQL6W3RKCS",
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export default db;
