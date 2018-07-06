import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home/Home'
import { openIt } from '../actions'

const HomeContainer = props => <Home {...props} />

export default connect(
  null,
  { openIt }
)(HomeContainer)
