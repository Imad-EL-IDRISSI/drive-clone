// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCm4ZegdPfUg7jcpCrMpTYBlDDWn4hgGEg",
  authDomain: "iei-drive-2024.firebaseapp.com",
  projectId: "iei-drive-2024",
  storageBucket: "iei-drive-2024.appspot.com",
  messagingSenderId: "895274933500",
  appId: "1:895274933500:web:fe7104a2a4c2d1630e8b79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };