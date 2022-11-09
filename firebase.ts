// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7jm_UQMzTniO41o95PJdYHKSaHgDJ8U0",
  authDomain: "netflix-clone-d5c51.firebaseapp.com",
  projectId: "netflix-clone-d5c51",
  storageBucket: "netflix-clone-d5c51.appspot.com",
  messagingSenderId: "585620900083",
  appId: "1:585620900083:web:1620864d782970e5260f86"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore();
const auth = getAuth()

export default app;
export {auth,db}