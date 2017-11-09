import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notification from '../components/Notification/Notification'
import {
  removeLogoutNotification,
  removeLoginNotification,
  removeSignupNotification,
  removeUnhandledErrNotification,
  removeInvalidTokenNotification } from '../redux/actions/notificationAction'
import PropTypes from 'prop-types'

class NotificationContainer extends Component {

  removeLogoutNotification = () => {
    this.props.removeLogoutNotification()
  }

  removeLoginNotification = () => {
    this.props.removeLoginNotification()
  }

  removeSignupNotification = () => {
    this.props.removeSignupNotification()
  }

  removeUnhandledErrNotification = () => {
    this.props.removeUnhandledErrNotification()
  }

  removeInvalidTokenNotification = () => {
    this.props.removeInvalidTokenNotification()
  }

  render () {
    return (
      <div>
        {
          this.props.notification.showLogoutNotification ?
          (
            <Notification
            removeNotification={this.removeLogoutNotification}
            text={'已经退出登录'}
            />
          ) :
          ''
        }
        {
          this.props.notification.showLoginNotification ?
          (
            <Notification
            removeNotification={this.removeLoginNotification}
            text={'已经成功登录'}
            />
          ) :
          ''
        }
        {
          this.props.notification.showSignupNotification ?
          (
            <Notification
            removeNotification={this.removeSignupNotification}
            text={'账号注册成功'}
            />
          ) :
          ''
        }
        {
          this.props.notification.showInvalidTokenNotification ?
          (
            <Notification
            removeNotification={this.removeInvalidTokenNotification}
            text={'登录过期 请重新登录'}
            />
          ) :
          ''
        }
        {
          this.props.notification.showUnhandledErrNotification ?
          (
            <Notification
            removeNotification={this.removeUnhandledErrNotification}
            text={'网络错误 操作失败'}
            />
          ) :
          ''
        }
      </div>
    )
  }
}

NotificationContainer.PropTypes = {
  removeLogoutNotification: PropTypes.func.isRequired,
  removeLoginNotification: PropTypes.func.isRequired,
  removeSignupNotification: PropTypes.func.isRequired,
  removeUnhandledErrNotification: PropTypes.func.isRequired,
  removeInvalidTokenNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  // curr: state.fakeAuth,
  notification: state.notification
})

export default connect(mapStateToProps,{
  removeLogoutNotification,
  removeLoginNotification,
  removeSignupNotification,
  removeUnhandledErrNotification,
  removeInvalidTokenNotification
})(NotificationContainer)
