import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto } from '../redux/actions'
import {
  getCurrentUser,
  getIsMember
} from '../redux/selectors/commonSelectors.js'
import Profile from '../components/Profile/Profile'
import { getIsAuthenticated } from '../redux/selectors/commonSelectors'

const ProfileContainer = props => {
  if (!props.isAuthenticated) {
    props.history.push('/')
    return null
  }
  return <Profile {...props} />
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isMember: getIsMember(state),
  isAuthenticated: getIsAuthenticated(state)
})

export default withRouter(
  connect(
    mapStateToProps,
    { goto }
  )(ProfileContainer)
)
