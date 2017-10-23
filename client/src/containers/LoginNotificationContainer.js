import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginNotification from '../components/Header/LoginNotification'
import { removeLoginNotification } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class LoginNotificationContainer extends Component {

  onClick = () => {
    this.props.removeLoginNotification()
  }

  render () {
    return (
      <LoginNotification onClick={this.onClick} />
    )
  }
}

LoginNotificationContainer.PropTypes = {
  removeLoginNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps,{ removeLoginNotification })(LoginNotificationContainer)
