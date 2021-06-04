import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAU5BCxSrtETa-uMOuDk2V3jGd3h0TOTSo",
  authDomain: "book-santa-17d03.firebaseapp.com",
  projectId: "book-santa-17d03",
  storageBucket: "book-santa-17d03.appspot.com",
  messagingSenderId: "104880902217",
  appId: "1:104880902217:web:4fdbe9c6045802557f2f98"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
