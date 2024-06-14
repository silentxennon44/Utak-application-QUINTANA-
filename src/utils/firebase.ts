import { initializeApp } from "firebase/app";
import { getDatabase,ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";


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
  return initializeApp(firebaseConfig);
}

const database = getDatabase(initDb())
const storage = getStorage(initDb());

export {
  database, storage,
}