import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import TopHeader from '../components/Header/TopHeader'
import {logout} from '../redux/actions/authAction'
import {getCurrentUser} from '../redux/selectors/commonSelectors.js'
import PropTypes from 'prop-types'
import {getNotification} from '../redux/selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'
import {clearNotification} from '../redux/actions/notificationAction'

const TopHeaderContainer = (props) => {
  const tempIsAuthenticated = window.sessionStorage.getItem('user')
  const {notification, clearNotification, logout, history} = props
  return (
    <div>
      <TopHeader
        loggedIn={tempIsAuthenticated}
        logout={logout}
        history={history}
      />
      {notification.text ? (
        <Notification
          text={notification.text}
          clearNotification={clearNotification}
        />
      ) : null}
    </div>
  )
}

TopHeaderContainer.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentUserInfo: getCurrentUser(state),
  notification: getNotification(state),
})

export default connect(mapStateToProps, {
  logout,
  clearNotification
})(withRouter(TopHeaderContainer))
