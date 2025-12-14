// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Firebase Auth
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Storage
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDKcR5QegoodAEGxq_SwIoVRCD9XpSzgA8",
  authDomain: "photographer2025-edfd9.firebaseapp.com",
  projectId: "photographer2025-edfd9",
  storageBucket: "photographer2025-edfd9.firebasestorage.app",
  messagingSenderId: "616743128934",
  appId: "1:616743128934:web:3bf162df422a9ac3fa42a7",
  measurementId: "G-7QCFZ5WCDG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

// Firestore DB
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Initialize Google Provider (use inside auth module, no duplicate export)
export const provider = new GoogleAuthProvider();

// Export Auth Functions
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
};
