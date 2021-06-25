import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyCCc2VjDA5yZxPuUItdNNUB1sjun1upyb8",
  authDomain: "friends--community.firebaseapp.com",
  projectId: "friends--community",
  storageBucket: "friends--community.appspot.com",
  messagingSenderId: "676491416351",
  appId: "1:676491416351:web:0349df9b0ca959f553d62a",
}).auth();


