
import React, { Component } from 'react'
import TopHeader from './TopHeaderContainer'
import Footer from '../components/Footer/Footer'
import Pay from '../components/Pay/Pay'

class PayContainer extends Component {
  render () {
    return (
      <div>
        <TopHeader />
        <Pay {...this.props} />
        <Footer />
      </div>
    )
  }
}

export default PayContainer
