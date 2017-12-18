import React, { Component } from 'react'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncProfileSettings = Loadable({
  loader: () => import('../components/Profile/ProfileSettings'),
  loading: LoadingComponent,
  delay: 300
})

class ProfileSettingsContainer extends Component {

  render () {
    return (
      <AsyncProfileSettings />
    )
  }
}

export default ProfileSettingsContainer
