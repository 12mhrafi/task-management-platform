// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_RgxggeqMVkgkixFAbWis3U1pl38LRkM",
  authDomain: "task-management-1055e.firebaseapp.com",
  projectId: "task-management-1055e",
  storageBucket: "task-management-1055e.appspot.com",
  messagingSenderId: "227061583374",
  appId: "1:227061583374:web:ab129ca4fdd1aa9690365f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;