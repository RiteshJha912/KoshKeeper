// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAu-Fs_dt3HiFZUh7B3h-QWKobGvyNFfkE',
  authDomain: 'expense-tracker99.firebaseapp.com',
  projectId: 'expense-tracker99',
  storageBucket: 'expense-tracker99.appspot.com',
  messagingSenderId: '97635266436',
  appId: '1:97635266436:web:a64fb484aee1b641bcb7d1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy