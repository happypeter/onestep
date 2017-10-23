import React, { Component } from 'react'
import { connect } from 'react-redux'
import LogoutNotification from '../components/Header/LogoutNotification'
import { removeLogoutNotification } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class NotificationContainer extends Component {

  onClick = () => {
    this.props.removeLogoutNotification()
  }

  render () {
    return (
      <LogoutNotification onClick={this.onClick} />
    )
  }
}

NotificationContainer.PropTypes = {
  removeLogoutNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps,{ removeLogoutNotification })(NotificationContainer)
