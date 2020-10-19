import React from 'react'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/dashboard" exact={true} component={Dashboard} />
      </Switch>
    </Router>
  )
}
