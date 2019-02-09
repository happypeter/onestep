import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home/Home'

const HomeContainer = props => <Home {...props} />

export default connect()(HomeContainer)
