import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUIMe3GnmNxEuI-iEBwCwoyMOzR5cEcKA",
  authDomain: "xfit-training.firebaseapp.com",
  projectId: "xfit-training",
  storageBucket: "xfit-training.firebasestorage.app",
  messagingSenderId: "722211207067",
  appId: "1:722211207067:web:d001476aebfb97a236133e",
  measurementId: "G-P8CSYKPRTQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
