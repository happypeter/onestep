import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto } from '../redux/actions'
import Layout from '../components/Layout/Layout'
import {
  getIsAuthenticated,
  getCurrentUser,
  getNotification
} from '../redux/selectors/commonSelectors'
import { logOut, checkAuth, getProfile } from '../redux/actions/authAction'
import { clearNotification } from '../redux/actions/index'

const LayoutContainer = props => <Layout {...props} />

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  currentUser: getCurrentUser(state),
  notification: getNotification(state)
})

// Connect can break router , the fix is withRouter:
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(
    mapStateToProps,
    {
      goto,
      logOut,
      checkAuth,
      clearNotification,
      getProfile
    }
  )(LayoutContainer)
)
