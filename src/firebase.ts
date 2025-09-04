import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUIMe3GnmNxEuI-iEBwCwoyMOzR5cEcKA",
    authDomain: "xfit-training.firebaseapp.com",
    projectId: "xfit-training",
    storageBucket: "xfit-training.firebasestorage.app",
    messagingSenderId: "722211207067",
    appId: "1:722211207067:web:d001476aebfb97a236133e",
    measurementId: "G-P8CSYKPRTQ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
