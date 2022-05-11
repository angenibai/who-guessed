import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0pzFXOLJBCeh5JvJTE7wdnulNWPypfRI",
  authDomain: "who-guessed.firebaseapp.com",
  projectId: "who-guessed",
  storageBucket: "who-guessed.appspot.com",
  messagingSenderId: "903987165116",
  appId: "1:903987165116:web:46fc84dfb24929cb529db9",
  measurementId: "G-F743YCW57F",
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

export default firebase;
