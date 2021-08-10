import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDEtnk-tTFBB-j-gSBhgQ4uo22LGStcwck",
  authDomain: "weight-tracker-app-e544e.firebaseapp.com",
  projectId: "weight-tracker-app-e544e",
  storageBucket: "weight-tracker-app-e544e.appspot.com",
  messagingSenderId: "1078486514254",
  appId: "1:1078486514254:web:7d5cbee565d34edaf4611f",
  measurementId: "G-4KP71HQVKF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const firestore = firebase.firestore();
