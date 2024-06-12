import axios from "axios";
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getDatabase,ref, set } from "firebase/database";


const initDb =  () => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "project1-f8077.firebaseapp.com",
    databaseURL: "https://project1-f8077-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "project1-f8077",
    storageBucket: "project1-f8077.appspot.com",
    messagingSenderId: "530976265289",
    appId: "1:530976265289:web:d936f1639cc0055c735b98",
    measurementId: "G-1XX85GT3DY"
  };
    
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
}
export default initDb