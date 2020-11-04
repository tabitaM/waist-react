import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthGuard = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

export default AuthGuard
