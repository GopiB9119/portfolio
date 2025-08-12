// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB94cm4JvBjr70Aj3hNqD3k3SexAvMYODk",
  authDomain: "portfolio-64c8d.firebaseapp.com",
  projectId: "portfolio-64c8d",
  storageBucket: "portfolio-64c8d.firebasestorage.app",
  messagingSenderId: "446488216540",
  appId: "1:446488216540:web:6683cc95737245a50cc519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
