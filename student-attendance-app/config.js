import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCHkxllNjXB-Yvy3D6gIQvWYoe3iHwq1eE",
  authDomain: "student-attendance-app-b2546.firebaseapp.com",
  databaseURL:
    "https://student-attendance-app-b2546-default-rtdb.firebaseio.com",
  projectId: "student-attendance-app-b2546",
  storageBucket: "student-attendance-app-b2546.appspot.com",
  messagingSenderId: "94564443266",
  appId: "1:94564443266:web:021371cbd941ad2b62409b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database();
