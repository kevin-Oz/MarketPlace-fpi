import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAezPoKrvvQopJ4G_PZvqMNpf1CHhSGbJc",
    authDomain: "ebay-phone-fpi.firebaseapp.com",
    projectId: "ebay-phone-fpi",
    storageBucket: "ebay-phone-fpi.appspot.com",
    messagingSenderId: "95900683199",
    appId: "1:95900683199:web:6ce44035a40e95fa18ef0a"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
const db = firebase.firestore();
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;

export { db, storage, TimeStamp, GeoPoint };
