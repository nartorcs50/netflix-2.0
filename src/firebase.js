import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyD1aVOs46AssxacI7siv6js12YI0VCKkiM",
  authDomain: "netflix-clone-7cc2b.firebaseapp.com",
  projectId: "netflix-clone-7cc2b",
  storageBucket: "netflix-clone-7cc2b.appspot.com",
  messagingSenderId: "63528112270",
  appId: "1:63528112270:web:a17a08a69b36ebb95fb9df",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const auth = getAuth(app);
// const db = getDatabase(app);
export {auth};
export const db = getFirestore(app);
export default db;

