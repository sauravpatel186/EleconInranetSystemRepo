// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr1L7dXeaW0rREy-Whd4PMPsMedMIbY8Q",
  authDomain: "eleconintranetsystem.firebaseapp.com",
  projectId: "eleconintranetsystem",
  storageBucket: "eleconintranetsystem.appspot.com",
  messagingSenderId: "414280507122",
  appId: "1:414280507122:web:93709562d4ab5da130ba6b",
  //measurementId: "G-2R9BJN0EDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);