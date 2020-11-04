import React from 'react'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthGuard from './AuthGuard'

export default function App() {
  return (
    <Router>
      <Switch>
        <AuthGuard path="/" exact={true} component={Login} />
        <AuthGuard path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}
