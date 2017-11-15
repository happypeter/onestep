import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

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

const TextFieldWrap = styled.div`
  display: ${props => props.hide ? 'none' : 'block'}
`

const SmsSendWrap = styled.div`
  display: ${props => props.hide ? 'none' : 'inline-block'}
`

const RaisedButtonWrap = styled(RaisedButton)`
  width: 130px;
  margin-top: 30px;
`

class Login extends Component {

  checkUsername = () => {
    let username = this.refs.username.getValue().trim()
    this.props.checkUsername(username)
  }

  checkPhoneNum = () => {
    let phoneNum = this.refs.phoneNum.getValue().trim()
    this.props.checkPhoneNum(phoneNum)
  }

  checkPassword = () => {
    let password = this.refs.password.getValue()
    this.props.checkPassword(password)
  }

  checkpasswordConsistent = () => {
    let password = this.refs.password.getValue()
    let passwordConsistent = this.refs.passwordConsistent.getValue()
    this.props.checkpasswordConsistent({password, passwordConsistent})
  }

  checkSmsCode = () => {
    let smsCode = this.refs.smsCode.getValue().trim()
    this.props.checkSmsCode(smsCode)
  }

  sendMsg = () => {
    let phoneNum = this.refs.phoneNum.getValue().trim()
    this.props.sendMsg(phoneNum)
  }

  alter = () => {
    this.props.alter()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let username = this.refs.username.getValue().trim()
    let phoneNum = this.refs.phoneNum.getValue().trim()
    let smsCode = this.refs.smsCode.getValue().trim()
    let password = this.refs.password.getValue()
    let passwordConsistent = this.refs.passwordConsistent.getValue()

    this.props.onSubmit({username, phoneNum, smsCode, password, passwordConsistent})
  }

  render () {
    return (
      <LoginWrap>
        <TopHeader />
        <FromWrap onSubmit={this.handleSubmit}>

          <TextFieldWrap
            hide={this.props.hideUsername}>
            <TextField
              ref='username'
              floatingLabelText='用户名'
              errorText={this.props.errorText.username}
              onBlur={this.checkUsername}
            />
          </TextFieldWrap>

          <TextField
            ref='phoneNum'
            floatingLabelText={this.props.hideUsername ? '手机号' : '请绑定手机号'}
            errorText={this.props.errorText.phoneNum}
            onBlur={this.checkPhoneNum}
          />

          <TextFieldWrap
            hide={this.props.hideUsername}
            >
            <TextField
              ref='smsCode'
              floatingLabelText='验证码'
              errorText={this.props.errorText.smsCode}
              style={{width: '65%'}}
              onBlur={this.checkSmsCode}
            />
            <SmsSendWrap
              hide={this.props.alreadySendMsg}
              >
              <RaisedButton
                onClick={this.sendMsg}
                >
                发送
              </RaisedButton>
            </SmsSendWrap>

            <SmsSendWrap
              hide={!this.props.alreadySendMsg}
              >
              <RaisedButton
                disabled={true}
                >
                {this.props.second}s
              </RaisedButton>
            </SmsSendWrap>
          </TextFieldWrap>

          <TextField
            ref='password'
            floatingLabelText='密码'
            type='password'
            errorText={this.props.errorText.password}
            onBlur={this.checkPassword}
          />

          <TextFieldWrap
            hide={this.props.hideUsername}>
            <TextField
              ref='passwordConsistent'
              onBlur={this.checkpasswordConsistent}
              errorText={this.props.errorText.passwordConsistent}
              floatingLabelText='确认密码'
              type='password'
            />
          </TextFieldWrap>

          <RaisedButtonWrap
            secondary={true}
            type='submit'
            label='登录'
          />

          <RaisedButtonWrap
            label={this.props.hideUsername ? '我是老用户' : '手机号登录'}
            onClick={this.alter}
            type="reset"
          />
        </FromWrap>
        <Footer />
      </LoginWrap>
    )
  }
}

export default Login
