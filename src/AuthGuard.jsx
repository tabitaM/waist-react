import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthGuard = ({ component: Component, ...rest }) => (
  <div>
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
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('user') ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  </div>
)

export default AuthGuard
