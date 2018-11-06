import React from 'react'
import { connect } from 'react-redux'
import { withRouteData } from 'react-static'
import Home from '../components/Home/Home'
import { getIsAuthenticated } from '../redux/selectors/commonSelectors'

const HomeContainer = props => <Home {...props} />

const mapPropsToStats = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(mapPropsToStats)(withRouteData(HomeContainer))
