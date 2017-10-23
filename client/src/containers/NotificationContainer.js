import React, { Component } from 'react'
import { connect } from 'react-redux'
import LogoutNotification from '../components/Notification/LogoutNotification'
import LoginNotification from '../components/Notification/LoginNotification'
import SignupNotification from '../components/Notification/SignupNotification'
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
            <LogoutNotification
            removeLogoutNotification={this.removeLogoutNotification}
            />
          ) :
          ''
        }
        {
          this.props.currentUserInfo.showLoginNotification ?
          (
            <LoginNotification
            removeLoginNotification={this.removeLoginNotification}
            />
          ) :
          ''
        }
        {
          this.props.currentUserInfo.showSignupNotification ?
          (
            <SignupNotification
            removeSignupNotification={this.removeSignupNotification}
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
