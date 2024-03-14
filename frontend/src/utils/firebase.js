// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsjqkR47JQqY7wPBUparKEJSDGL_HyLJ8",
  authDomain: "tweetssummarizer.firebaseapp.com",
  projectId: "tweetssummarizer",
  storageBucket: "tweetssummarizer.appspot.com",
  messagingSenderId: "490804832432",
  appId: "1:490804832432:web:d0fed05b336486e9de3375",
  measurementId: "G-4KDKQWVZRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

