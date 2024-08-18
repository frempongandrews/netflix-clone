// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC6bD41KGWSogKomG195mP04ij1gPlqQE8",
	authDomain: "nextjs-netflix-clone-9c72b.firebaseapp.com",
	projectId: "nextjs-netflix-clone-9c72b",
	storageBucket: "nextjs-netflix-clone-9c72b.appspot.com",
	messagingSenderId: "903319588330",
	appId: "1:903319588330:web:8f4de00115bdcd1df97693",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore();

export default app;

export { auth, db };
