// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWrD4HM8Cbb-JwDAcLExMFsNcL8Wmuse8",
  authDomain: "firstapp-54d65.firebaseapp.com",
  databaseURL: "https://firstapp-54d65-default-rtdb.firebaseio.com",
  projectId: "firstapp-54d65",
  storageBucket: "firstapp-54d65.appspot.com",
  messagingSenderId: "890204621120",
  appId: "1:890204621120:web:47648a7e1ddc1c4c1692a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
