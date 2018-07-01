import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions/authAction'
import { goto } from '../redux/actions'
import {
  getCurrentUser,
  getIsAuthenticated
} from '../redux/selectors/commonSelectors'
import PropTypes from 'prop-types'
import { getNotification } from '../redux/selectors/commonSelectors'
import { clearNotification } from '../redux/actions'
import Layout from '../components/Layout'

const LayoutContainer = props => <Layout {...props} />

LayoutContainer.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state),
  notification: getNotification(state)
})

// Connect can break router , the fix is withRouter: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(
    mapStateToProps,
    {
      goto,
      logout,
      clearNotification
    }
  )(LayoutContainer)
)
