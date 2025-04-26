//import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALfPAqichXxhycOkhhCWbUUWkOiTLffQ8",
  authDomain: "fitness-app-9f7df.firebaseapp.com",
  databaseURL: "https://fitness-app-9f7df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-app-9f7df",
  storageBucket: "fitness-app-9f7df.appspot.com",
  messagingSenderId: "171826289679",
  appId: "1:171826289679:web:52baa59a819f96873f177a",
  measurementId: "G-12PHD0CFND"
};

//initialize firebase
//const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
//initialize auth
const auth = getAuth(app);

export { auth };
