import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, googleProvider } from '../firebaseConfig'

export default function Login() {
  const navigate = useHistory()
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

  const isEmailOrPasswordWrong = () => {
    if (!email || !password) {
      window.alert('Email or password cannot be empty!')
      setEmail('')
      setPassword('')
      return true
    }
    return false
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="email"
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
          onClick={async () => {
            if (isEmailOrPasswordWrong()) return
            await auth.signInWithEmailAndPassword(email, password)
            localStorage.setItem('user', auth.currentUser.uid)
            navigate.push('/dashboard')
          }}
        >
          Login
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await auth.signInWithPopup(googleProvider)
            localStorage.setItem('user', auth.currentUser.uid)
            navigate.push('/dashboard')
          }}
        >
          Sign In with Google
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await auth.createUserWithEmailAndPassword(email, password)
            localStorage.setItem('user', auth.currentUser.uid)
            navigate.push('/dashboard')
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
