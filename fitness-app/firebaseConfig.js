// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALfPAqichXxhycOkhhCWbUUWkOiTLffQ8",
  authDomain: "fitness-app-9f7df.firebaseapp.com",
  databaseURL: "https://fitness-app-9f7df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-app-9f7df",
  storageBucket: "fitness-app-9f7df.firebasestorage.app",
  messagingSenderId: "171826289679",
  appId: "1:171826289679:web:52baa59a819f96873f177a",
  measurementId: "G-12PHD0CFND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);