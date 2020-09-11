import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBM3mHiy5-sDPUxXXfana9ArbSIIkl8chw",
    authDomain: "amazfclone-a7c3d.firebaseapp.com",
    databaseURL: "https://amazfclone-a7c3d.firebaseio.com",
    projectId: "amazfclone-a7c3d",
    storageBucket: "amazfclone-a7c3d.appspot.com",
    messagingSenderId: "507859081723",
    appId: "1:507859081723:web:a3c82c11374802b750535e"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export {db,auth};