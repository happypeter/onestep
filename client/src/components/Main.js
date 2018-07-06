import React, { Component } from 'react'
import Routes from 'react-static-routes'
import { Router } from 'react-static'
import { history } from '../utils/routerUtils'

class Main extends Component {
  render () {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    )
  }
}

export default Main
