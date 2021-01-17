import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDXdozot24PgJ05qth7stWp6NdcrJqHo4Y",
  authDomain: "a-walk-in-the-park-89cc0.firebaseapp.com",
  databaseURL: "https://a-walk-in-the-park-89cc0.com",
  projectId: "a-walk-in-the-park-89cc0",
  storageBucket: "a-walk-in-the-park-89cc0.appspot.com",
  messagingSenderId: "185033358747",
  appId: "1:185033358747:web:903c7e5c778149412a353e",
  measurementId: "G-8BKQV908L3",
})

export const auth = firebase.auth();
export const db = firebase.firestore();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default app;


