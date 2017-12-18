import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getNotification } from '../selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'
// import {
//   removeLogoutNotification,
//   removeLoginNotification,
//   removeSignupNotification,
//   removeUnhandledErrNotification,
//   removeInvalidTokenNotification,
//   removeResetPasswordNotification
// } from '../redux/actions/notificationAction'
// import PropTypes from 'prop-types'

class NotificationContainer extends Component {

  // removeLogoutNotification = () => {
  //   this.props.removeLogoutNotification()
  // }
  //
  // removeLoginNotification = () => {
  //   this.props.removeLoginNotification()
  // }
  //
  // removeSignupNotification = () => {
  //   this.props.removeSignupNotification()
  // }
  //
  // removeUnhandledErrNotification = () => {
  //   this.props.removeUnhandledErrNotification()
  // }
  //
  // removeInvalidTokenNotification = () => {
  //   this.props.removeInvalidTokenNotification()
  // }
  //
  // removeResetPasswordNotification = () => {
  //   this.props.removeResetPasswordNotification()
  // }

  render () {
    let {
      showLogoutNotification,
      showLoginNotification,
      showSignupNotification,
      showInvalidTokenNotification,
      showUnhandledErrNotification,
      showResetPasswordNotification,
      showNotPaidNotification
    } = this.props.notification
    return (
      <div>
        {
          showLogoutNotification
          ? (
            <Notification
            // removeNotification={this.removeLogoutNotification}
              text={'已经退出登录'}
            />
          )
          : null
        }
        {
          showLoginNotification
          ? (
            <Notification
            // removeNotification={this.removeLoginNotification}
              text={'已经成功登录'}
            />
          )
          : null
        }
        {
          showSignupNotification
          ? (
            <Notification
            // removeNotification={this.removeSignupNotification}
              text={'账号注册成功'}
            />
          )
          : null
        }
        {
          showResetPasswordNotification
          ? (
            <div>
              <Redirect to='/profile' />
              <Notification
            // removeNotification={this.removeResetPasswordNotification}
                text={'重置密码成功'}
              />
            </div>
          )
          : null
        }
        {
          (window.sessionStorage.getItem('jwtToken') && showInvalidTokenNotification)
          ? (
            <Notification
            // removeNotification={this.removeInvalidTokenNotification}
              text={'登录过期 请重新登录'}
            />
          )
          : null
        }
        {
          showNotPaidNotification
          ? (
            <Notification
            // removeNotification={this.removeUnhandledErrNotification}
              text={'您需要成为好奇猫会员，或者购买课程'}
            />
          )
          : null
        }
        {
          showUnhandledErrNotification
          ? (
            <Notification
            // removeNotification={this.removeUnhandledErrNotification}
              text={'网络错误 操作失败'}
            />
          )
          : null
        }
      </div>
    )
  }
}

// NotificationContainer.PropTypes = {
//   removeLogoutNotification: PropTypes.func.isRequired,
//   removeLoginNotification: PropTypes.func.isRequired,
//   removeSignupNotification: PropTypes.func.isRequired,
//   removeUnhandledErrNotification: PropTypes.func.isRequired,
//   removeInvalidTokenNotification: PropTypes.func.isRequired,
//   removeResetPasswordNotification: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
  notification: getNotification(state)
})

export default connect(mapStateToProps
//   ,{
//   removeLogoutNotification,
//   removeLoginNotification,
//   removeSignupNotification,
//   removeUnhandledErrNotification,
//   removeInvalidTokenNotification,
//   removeResetPasswordNotification
// }
)(NotificationContainer)
