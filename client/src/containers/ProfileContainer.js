import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/Profile/Profile'
import { getIsAuthenticated } from '../redux/selectors/commonSelectors'
import { checkAuth } from '../redux/actions'

const ProfileContainer = props => <Profile {...props} />

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(
  mapStateToProps,
  { checkAuth }
)(ProfileContainer)
