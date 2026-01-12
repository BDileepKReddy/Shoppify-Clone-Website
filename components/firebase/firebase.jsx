// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZJlWkv9UsMMnmvAPSvpDcXlif_NGrnXA",
  authDomain: "aniyor-project.firebaseapp.com",
  projectId: "aniyor-project",
  storageBucket: "aniyor-project.firebasestorage.app",
  messagingSenderId: "797646068678",
  appId: "1:797646068678:web:d77601607d66e0a5ff70c7"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth( )