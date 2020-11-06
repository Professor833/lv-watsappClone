import firebase from "firebase";
// import firestore from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6mGMzUhPwHgTz3kOsEansAgSi5aBzsNw",
  authDomain: "lv-watsappclone.firebaseapp.com",
  databaseURL: "https://lv-watsappclone.firebaseio.com",
  projectId: "lv-watsappclone",
  storageBucket: "lv-watsappclone.appspot.com",
  messagingSenderId: "498614071393",
  appId: "1:498614071393:web:67352315ff14419019fa20",
  measurementId: "G-57RWHVQN88",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); // use firestore feature of app
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
