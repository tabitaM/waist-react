import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from 'firebase/app'

const AuthGuard = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth().currentUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
)

export default AuthGuard
