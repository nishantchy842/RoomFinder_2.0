// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//latter add this in enviroment varioable .env file
const firebaseConfig = {
  apiKey: "AIzaSyBTBs3EFD0WaXlFYBaYn8h0QocKsbQDxto",
  authDomain: "roomfinder-2.firebaseapp.com",
  projectId: "roomfinder-2",
  storageBucket: "roomfinder-2.appspot.com",
  messagingSenderId: "81364394256",
  appId: "1:81364394256:web:2a9200da005294c53e4595",
  measurementId: "G-3PY4PRVZ1Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
