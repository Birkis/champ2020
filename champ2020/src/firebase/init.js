import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCq2BdvrCRPO3xQGTnHiOZzPPAhzMzgNMI",
    authDomain: "champ2020-8ed5d.firebaseapp.com",
    databaseURL: "https://champ2020-8ed5d.firebaseio.com",
    projectId: "champ2020-8ed5d",
    storageBucket: "champ2020-8ed5d.appspot.com",
    messagingSenderId: "942247007114",
    appId: "1:942247007114:web:5398b338ea1748f2c72e73",
    measurementId: "G-HK279H4VW4"
  };
  // Initialize Firebase


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()