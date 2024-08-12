// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoiz_C1O2RkGxWOy4BdW2MBTA5jayChtc",
  authDomain: "webcarros-bd.firebaseapp.com",
  projectId: "webcarros-bd",
  storageBucket: "webcarros-bd.appspot.com",
  messagingSenderId: "642285602095",
  appId: "1:642285602095:web:c28326b5cbf9df47f30dda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };