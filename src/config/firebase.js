// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCMJfomG7jd6x_jmHrtyZHEaCd_cMO21PY",
  authDomain: "fir-course-f5daa.firebaseapp.com",
  projectId: "fir-course-f5daa",
  storageBucket: "fir-course-f5daa.appspot.com",
  messagingSenderId: "648750492177",
  appId: "1:648750492177:web:40f4a972883aa47c971fb0",
  measurementId: "G-5VHYGCEM56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)