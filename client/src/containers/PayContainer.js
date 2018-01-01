import React from 'react'
import TopHeader from './TopHeaderContainer'
import Footer from '../components/Footer/Footer'
import Pay from '../components/Pay/Pay'

export default props => (
  <div>
    <TopHeader />
    <Pay {...props} />
    <Footer />
  </div>
)
