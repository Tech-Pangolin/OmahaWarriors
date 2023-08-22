 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9P6J67JxR5M9zaKiE-yYbBv0prdQhULw",
  authDomain: "omahawarriors-b8713.firebaseapp.com",
  projectId: "omahawarriors-b8713",
  storageBucket: "omahawarriors-b8713.appspot.com",
  messagingSenderId: "692184234235",
  appId: "1:692184234235:web:993e378928060be3b0185e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);