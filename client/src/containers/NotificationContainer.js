import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getNotification} from '../redux/selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'

class NotificationContainer extends Component {
  render() {
    const {
      showLogoutNotification,
      showLoginNotification,
      showSignupNotification,
      showInvalidTokenNotification,
      showUnhandledErrNotification,
      showResetPasswordNotification,
      showNotPaidNotification,
    } = this.props.notification
    return (
      <div>
        {showLogoutNotification ? (
          <Notification
            text={'已经退出登录'}
          />
        ) : null}
        {showLoginNotification ? (
          <Notification
            text={'已经成功登录'}
          />
        ) : null}
        {showSignupNotification ? (
          <Notification
            text={'账号注册成功'}
          />
        ) : null}
        {showResetPasswordNotification ? (
          <div>
            <Redirect to="/user/profile" />
            <Notification
              text={'重置密码成功'}
            />
          </div>
        ) : null}
        {window.sessionStorage.getItem('jwtToken') &&
        showInvalidTokenNotification ? (
          <Notification
            text={'登录过期 请重新登录'}
          />
        ) : null}
        {showNotPaidNotification ? (
          <Notification
            text={'您需要成为好奇猫会员，或者购买课程'}
          />
        ) : null}
        {showUnhandledErrNotification ? (
          <Notification
            text={'网络错误 操作失败'}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notification: getNotification(state),
})

export default connect(mapStateToProps)(NotificationContainer)
