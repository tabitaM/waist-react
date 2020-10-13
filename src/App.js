import React from 'react'
import Home from './containers/Home'
import Login from './containers/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" exact={true} component={Login} />
      </Switch>
    </Router>
  )
}
