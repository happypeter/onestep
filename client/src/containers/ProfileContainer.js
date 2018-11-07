import React from 'react'
import { connect } from 'react-redux'
import { withRouteData } from 'react-static'
import { getCurrentUser } from '../redux/selectors/commonSelectors.js'
import Profile from '../components/Profile/Profile'
import {
  getIsAuthenticated,
  getPaidCourses,
  getIsVip
} from '../redux/selectors/commonSelectors'

const ProfileContainer = props => {
  if (!props.isAuthenticated) {
    props.history.push('/')
    return null
  }
  return <Profile {...props} />
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  paidCourses: getPaidCourses(state),
  isAuthenticated: getIsAuthenticated(state),
  isVip: getIsVip(state)
})

export default connect(mapStateToProps)(withRouteData(ProfileContainer))
