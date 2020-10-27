import React from 'react'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import { auth } from 'firebase/app'

export default function App() {
  console.log('User logged: ', auth().currentUser)
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <AuthGuard path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}
