import React from 'react'
import Home from '../components/Home/Home'
import { connect } from 'react-redux'
import { goto } from '../redux/actions'

const HomeContainer = props => <Home {...props} />

export default connect(
  null,
  { goto }
)(HomeContainer)
