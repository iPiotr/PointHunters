// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-0kbBdf61W5_L00eC9eS7vepGq5qPd8M",
  authDomain: "pointhunters-6148d.firebaseapp.com",
  databaseURL: "https://pointhunters-6148d-default-rtdb.firebaseio.com",
  projectId: "pointhunters-6148d",
  storageBucket: "pointhunters-6148d.appspot.com",
  messagingSenderId: "149298653650",
  appId: "1:149298653650:web:6984ac23c2a99a1581400b",
  measurementId: "G-SEHNWCVMWX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, db, auth };
