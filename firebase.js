// Import the functions you need from the SDKs you need
import * as firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVjXKkeAZBb4NPB0CQUPEJQ-KZo-dem88',
  authDomain: 'fir-auth-1ce5b.firebaseapp.com',
  projectId: 'fir-auth-1ce5b',
  storageBucket: 'fir-auth-1ce5b.appspot.com',
  messagingSenderId: '110284135774',
  appId: '1:110284135774:web:232cc5fa0e6438a26383cf',
  measurementId: 'G-6L13T69H1Q',
}

// Initialize Firebase
let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  // eslint-disable-next-line no-unused-vars
  app = firebase.app()
}

const auth = firebase.auth()

export { auth }
