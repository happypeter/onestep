import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupNotification from '../components/Header/SignupNotification'
import { removeSignupNotification } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class SignupNotificationContainer extends Component {

  onClick = () => {
    this.props.removeSignupNotification()
  }

  render () {
    return (
      <SignupNotification onClick={this.onClick} />
    )
  }
}

SignupNotificationContainer.PropTypes = {
  removeSignupNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps,{ removeSignupNotification })(SignupNotificationContainer)
