import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home/Home'
import { getUsers } from '../redux/actionCreators'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  count: state.users.count
})

export default connect(
  mapStateToProps,
  { getUsers }
)(HomeContainer)
