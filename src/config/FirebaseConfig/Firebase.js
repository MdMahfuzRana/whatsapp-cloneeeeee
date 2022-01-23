import firebase from 'firebase'
import 'firebase/firestore';
import {orderBy} from "firebase/firestore"; 


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA0td6WZTVlRCKE6MGnK9qQ3uAy-F3_nS8",
  authDomain: "whtsapp-clone-33332.firebaseapp.com",
  projectId: "whtsapp-clone-33332",
  storageBucket: "whtsapp-clone-33332.appspot.com",
  messagingSenderId: "768113134900",
  appId: "1:768113134900:web:0a5f92a4849af849ac6961",
  measurementId: "G-72WER3Y3BP"
  })

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const order = orderBy;


export {db,provider, auth, storage,createTimestamp,order}