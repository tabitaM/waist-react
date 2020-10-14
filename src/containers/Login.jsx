import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from '../firebaseConfig'

firebase.initializeApp(firebaseConfig)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="username"
          name="email"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
          }}
        >
          Login
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(googleAuthProvider)
          }}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  )
}
