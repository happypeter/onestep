import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../redux/actions/authAction'
import {
  getCurrentUser,
  getIsAuthenticated
} from '../redux/selectors/commonSelectors'
import PropTypes from 'prop-types'
import { getNotification } from '../redux/selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'
import { clearNotification } from '../redux/actions/notificationAction'
import Layout from '../components/Layout'

const LayoutContainer = props => {
  const { notification, clearNotification } = props
  return (
    <div>
      <Layout {...props} />
      {notification.text ? (
        <Notification
          text={notification.text}
          clearNotification={clearNotification}
        />
      ) : null}
    </div>
  )
}

LayoutContainer.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state),
  notification: getNotification(state)
})

export default connect(
  mapStateToProps,
  {
    logout,
    clearNotification
  }
)(withRouter(LayoutContainer))
