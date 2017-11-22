import React, { Component } from 'react'
import ProfileSettings from '../components/Profile/ProfileSettings'

class ProfileSettingsContainer extends Component {
  constructor() {
    super()
    this.state = {
      showResetPasswordForm: false
    }
  }

  toggle = () => {
    this.setState({
      showResetPasswordForm: !this.state.showResetPasswordForm
    })
  }

  render () {
    return (
      <ProfileSettings
      toggle={this.toggle}
      showResetPasswordForm={this.state.showResetPasswordForm}
     />
    )
  }
}

export default ProfileSettingsContainer
