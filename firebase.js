// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkm8LYrHRKvav27jnacqlCPNkEWCthKZ8",
  authDomain: "todoapp-2884b.firebaseapp.com",
  projectId: "todoapp-2884b",
  storageBucket: "todoapp-2884b.appspot.com",
  messagingSenderId: "906349996722",
  appId: "1:906349996722:web:f867ec555540ebebc9b7ab",
  measurementId: "G-KYQREZWFMB"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);