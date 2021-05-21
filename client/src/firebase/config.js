import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCg-ta2jR8bbETRcVARFFvEi6ov7HXFqeo",
  authDomain: "guessthecode-4c0bc.firebaseapp.com",
  projectId: "guessthecode-4c0bc",
  storageBucket: "guessthecode-4c0bc.appspot.com",
  messagingSenderId: "972589538543",
  appId: "1:972589538543:web:b6ed62d284ed533b75cf1a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;