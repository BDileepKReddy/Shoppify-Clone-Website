// firebase-config.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZJlWkv9UsMMnmvAPSvpDcXlif_NGrnXA",
  authDomain: "aniyor-project.firebaseapp.com",
  projectId: "aniyor-project",
  storageBucket: "aniyor-project.appspot.com",
  messagingSenderId: "797646068678",
  appId: "1:797646068678:web:d77601607d66e0a5ff70c7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase and Auth (Compat style)
const auth = firebase.auth();
export { firebase, auth };
