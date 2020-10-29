import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyC1zhbzMxOy5Y0Ag-fAhDy_K44b_oa5oZg',
  authDomain: 'waist-react.firebaseapp.com',
  databaseURL: 'https://waist-react.firebaseio.com',
  projectId: 'waist-react',
  storageBucket: 'waist-react.appspot.com',
  messagingSenderId: '586802827878',
  appId: '1:586802827878:web:de3e0ea94c1395d07f53a7',
  measurementId: 'G-9C4G4S4PS7',
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const firebaseDB = firebaseApp.database()
