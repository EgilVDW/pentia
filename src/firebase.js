// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
