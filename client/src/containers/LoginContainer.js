import React, { Component } from 'react'
import TopHeader from '../components/Header/TopHeader'
import Footer from '../components/Footer/Footer'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'

const FromWrap = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 0 0px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3;
  text-align: center;
  padding: 0 1em 1em;
  margin-top: 10%;
  @media (min-width: 400px): {
    width: 400px;
    margin: 30px auto;
  }
`

const TextFieldWrap = styled(TextField)`
  display: block;
  width: 100%;
  font-size: 0.9em;
`

const RaisedButtonWrap = styled(RaisedButton)`
  width: 130px;
  margin-top: 30px;
`

class Login extends Component {
  render () {
    return (
      <div style={{ display:'flex', flexDirection: 'column', height: '100vh' }}>
        <TopHeader />
        <FromWrap>
          <TextFieldWrap floatingLabelText='用户名' />
          <TextFieldWrap floatingLabelText='密码' type='password' />
          <RaisedButtonWrap secondary={true} type='submit' label='登录' />
        </FromWrap>
        <Footer />
      </div>
    )
  }
}

export default Login
