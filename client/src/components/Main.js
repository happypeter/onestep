import React, { Component } from 'react'
import Routes from 'react-static-routes'
import Layout from '../containers/LayoutContainer'

class Main extends Component {
  render() {
    return (
      <Layout>
        <Routes />
      </Layout>
    )
  }
}

export default Main
