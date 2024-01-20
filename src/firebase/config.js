// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth()
export const db = getFirestore(app);
