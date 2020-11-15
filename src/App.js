import React from 'react'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import { createGlobalStyle } from 'styled-components'

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <AuthGuard path="/" exact={true} component={Login} />
        <AuthGuard path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1c1c20;
    color: #65656b;
    height: 100%;
  }
`
