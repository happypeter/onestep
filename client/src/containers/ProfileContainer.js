import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto } from '../redux/actions'
import {
  getCurrentUser,
  getIsMember
} from '../redux/selectors/commonSelectors.js'
import Profile from '../components/Profile/Profile'

const ProfileContainer = props => <Profile {...props} />

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isMember: getIsMember(state)
})

export default withRouter(
  connect(
    mapStateToProps,
    { goto }
  )(ProfileContainer)
)
