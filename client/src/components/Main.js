import React, { Component } from 'react'
import Routes from 'react-static-routes'
import { Router } from 'react-static'
import { history } from '../utils/routerUtils'
import Layout from '../containers/LayoutContainer'

class Main extends Component {
  render () {
    return (
      <Router history={history}>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    )
  }
}

export default Main
