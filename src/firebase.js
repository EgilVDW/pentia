// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Pt4KkOp3dfCP0n0cNtXIH0BBGTe3W18",
  authDomain: "pentia-1.firebaseapp.com",
  projectId: "pentia-1",
  storageBucket: "pentia-1.firebasestorage.app",
  messagingSenderId: "106566492564",
  appId: "1:106566492564:web:e9877618e195f17ee4ef81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080)
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
}

// clear local storage
// localStorage.clear()
// indexedDB.deleteDatabase("firebaseLocalStorageDb")
// location.reload()

// start emulator
// firebase emulators:start --only firestore,auth --project pentia-1
// node seed-emulator.js