import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore, getDocs, collection, setDoc, doc, getDoc, deleteDoc, query, where, or, and, updateDoc, arrayUnion, serverTimestamp, onSnapshot} from 'firebase/firestore'
import { getAuth, signInWithPopup, onAuthStateChanged, signOut, updateProfile, updateEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)

export {auth, storage, signInWithPopup, onAuthStateChanged, signOut, getDocs, collection, setDoc, doc, getDoc, updateEmail, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, deleteDoc, query, where, or, and, updateDoc, arrayUnion,serverTimestamp, onSnapshot}
export default db