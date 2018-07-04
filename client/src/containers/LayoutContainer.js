import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto } from '../redux/actions'
import {
  getCurrentUser,
  getIsAuthenticated,
  getNotification,
  getIsSidebarOpen,
  getIsOnEpisodePage
} from '../redux/selectors/commonSelectors'
import { clearNotification, toggleDrawer } from '../redux/actions'
import Layout from '../components/Layout/Layout'

const LayoutContainer = props => <Layout {...props} />

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state),
  notification: getNotification(state),
  isSidebarOpen: getIsSidebarOpen(state),
  isOnEpisodePage: getIsOnEpisodePage(state)
})

// Connect can break router , the fix is withRouter: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(
    mapStateToProps,
    {
      goto,
      clearNotification,
      toggleDrawer
    }
  )(LayoutContainer)
)
