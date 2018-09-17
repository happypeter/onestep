import React from 'react'
import { connect } from 'react-redux'
import { withRouteData } from 'react-static'
import Home from '../components/Home/Home'
import { goto } from '../redux/actions'

const HomeContainer = props => <Home {...props} />

export default connect(
  null,
  { goto }
)(withRouteData(HomeContainer))
