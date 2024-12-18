import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwlwmzL2RcBwxNMnX9l_91jL7cI8Eue8g",
  authDomain: "fp-pemweb-p17.firebaseapp.com",
  projectId: "fp-pemweb-p17",
  storageBucket: "fp-pemweb-p17.firebasestorage.app",
  messagingSenderId: "1010478324721",
  appId: "1:1010478324721:web:c7f7395ebcc255e36b0250",
  measurementId: "G-0LPKG1H15R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc, setDoc, doc };