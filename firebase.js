// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
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

// eslint-disable-next-line import/no-mutable-exports
let firebaseApp

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig)
  initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) })
} else {
  firebaseApp = getApp()
}

export { firebaseApp }
