import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

import Loadable from 'react-loadable'
import LoadingComponent from '../common/Loading'
import Button from 'material-ui/Button';

const AsyncResetPassword = Loadable({
  loader: () => import('../../containers/ResetPasswordContainer'),
  loading: LoadingComponent,
  delay: 300
})

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

class ProfileSettings extends Component {

  render () {
    return (
        <Wrap>
          <TopHeader />
          <div >
            <AsyncResetPassword />
          </div>
          <Footer />
        </Wrap>
    )
  }
}

export default ProfileSettings
