import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/Loading'
import RaisedButton from 'material-ui/RaisedButton'

const AsyncResetPassword = Loadable({
  loader: () => import('../../containers/ResetPasswordContainer'),
  loading: LoadingComponent,
  delay: 300
})

const RaisedButtonWrap = styled(RaisedButton)`
  width: 130px;
  margin-top: 30px;
  margin-left: 5px;
  margin-right: 5px;
`

class ProfileSettings extends Component {
  toggle = () => {
    this.props.toggle()
  }

  render () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <TopHeader />
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Settings</div>
          <RaisedButtonWrap onClick={this.toggle}>
              重置密码
          </RaisedButtonWrap>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ flexGrow: 1, display: this.props.showResetPasswordForm ? 'block' : 'none' }}>
            <AsyncResetPassword />
          </div>
          <Footer />
        </div>
    )
  }
}

export default ProfileSettings
