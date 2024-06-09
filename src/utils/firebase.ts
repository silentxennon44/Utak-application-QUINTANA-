// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "project1-f8077.firebaseapp.com",
  databaseURL: "https://project1-f8077-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project1-f8077",
  storageBucket: "project1-f8077.appspot.com",
  messagingSenderId: "530976265289",
  appId: "1:530976265289:web:d936f1639cc0055c735b98",
  measurementId: "G-1XX85GT3DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);