// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-302b5.firebaseapp.com",
  projectId: "mern-blog-302b5",
  storageBucket: "mern-blog-302b5.appspot.com",
  messagingSenderId: "578193998957",
  appId: "1:578193998957:web:d2e52bee78236154bdab64",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
