import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLn41Ic3EoiyutWoyg6ENqrhC7LcP4U18",
    authDomain: "react-slack-chat-fc3d1.firebaseapp.com",
    projectId: "react-slack-chat-fc3d1",
    storageBucket: "react-slack-chat-fc3d1.appspot.com",
    messagingSenderId: "501225191838",
    appId: "1:501225191838:web:55e69129a1505b74313e8f",
    measurementId: "G-LNQG5X4ZJZ"
  };

firebase.initializeApp(firebaseConfig)

const fStore = firebase.firestore()
const auth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()
const storage = firebase.storage()

export default { fStore, auth , firebase, timestamp, storage } 