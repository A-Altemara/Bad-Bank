// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3sGSgZU17iwVqaw8r2gcEEGRPfpiVu1w",
    authDomain: "airiel-altemarafullstackbank.firebaseapp.com",
    projectId: "airiel-altemarafullstackbank",
    storageBucket: "airiel-altemarafullstackbank.appspot.com",
    messagingSenderId: "212305478592",
    appId: "1:212305478592:web:3f8e98342b969e8a2f7e25",
    measurementId: "G-3M8EF3KY4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);