import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notification from '../components/Notification/Notification'
import { removeLogoutNotification } from '../redux/actions/authAction'
import { removeLoginNotification } from '../redux/actions/authAction'
import { removeSignupNotification } from '../redux/actions/authAction'
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

  render () {
    return (
      <div>
        {
          this.props.currentUserInfo.showLogoutNotification ?
          (
            <Notification
            removeNotification={this.removeLogoutNotification}
            text={'已经退出登录'}
            />
          ) :
          ''
        }
        {
          this.props.currentUserInfo.showLoginNotification ?
          (
            <Notification
            removeNotification={this.removeLoginNotification}
            text={'已经成功登录'}
            />
          ) :
          ''
        }
        {
          this.props.currentUserInfo.showSignupNotification ?
          (
            <Notification
            removeNotification={this.removeSignupNotification}
            text={'账号注册成功'}
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
  removeSignupNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps,{
  removeLogoutNotification,
  removeLoginNotification,
  removeSignupNotification
})(NotificationContainer)
