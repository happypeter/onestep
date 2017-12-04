import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import styled from 'styled-components'

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const FromWrap = styled.form`
  min-height: 450px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px #888888;
  border-top: 2.5em solid #00BCD4;
  text-align: center;
  margin-top: 5%;
  padding: 0 60px;
  @media (min-width: 400px) {
    width: 360px;
    margin: 80px auto;
    padding: 0 80px 20px;
  }
`

const TextFieldWrap = styled.div`
  display: ${props => props.hide ? 'none' : 'flex'};
  width: 100%;
`

const SmsSendWrap = styled.div`
  display: ${props => props.hide ? 'none' : 'inline-block'}
`

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: ${props => props.hide ? 'column' : 'row'}
`

const ActionButton = styled(Button)`
  && {
    background-color: #00BCD4;
    color: #FFFFFF;
    width: 100%;
    margin-top: 1.5em;
  }
`

const ShortButton = styled(Button)`
  && {
    color: #00BCD4;
    font-size: 1em;
    height: 100%;
    line-height: 100%;
  }
`

class Login extends Component {

  getUsername = (e) => {
    this.props.getUsername(e.target.value)
  }

  getPhoneNum = (e) => {
    this.props.getPhoneNum(e.target.value)
  }

  getPassword = (e) => {
    this.props.getPassword(e.target.value)
  }

  getPasswordConsistent = (e) => {
    this.props.getPasswordConsistent(e.target.value)
  }

  getSmsCode = (e) => {
    this.props.getSmsCode(e.target.value)
  }

  sendMsg = () => {
    this.props.sendMsg()
  }

  alter = () => {
    this.props.alter()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit()
  }

  render () {
    return (
      <LoginWrap>
        <TopHeader />
        <FromWrap onSubmit={this.handleSubmit}>

          <TextFieldWrap
            hide={this.props.hideUsername}>

            <FormControl
              error={this.props.errorText.username}
              fullWidth={true}
              margin={'dense'}
              >
              <InputLabel htmlFor='username'>用户名</InputLabel>
              <Input onBlur={this.getUsername} />
              <FormHelperText>{this.props.errorText.username}</FormHelperText>
            </FormControl>

          </TextFieldWrap>

          <FormControl
            error={this.props.errorText.phoneNum}
            fullWidth={true}
            margin={'dense'}
            >
            <InputLabel
              htmlFor='phoneNum'
              >
              {this.props.hideUsername ? '手机号' : '请绑定手机号'}
            </InputLabel>
            <Input onBlur={this.getPhoneNum} />
            <FormHelperText>{this.props.errorText.phoneNum}</FormHelperText>
          </FormControl>

          <TextFieldWrap
            hide={this.props.hideUsername}
            >

            <FormControl
              error={this.props.errorText.smsCode}
              margin={'dense'}
              >
              <InputLabel htmlFor='smsCode'>验证码</InputLabel>
              <Input onBlur={this.getSmsCode} />
              <FormHelperText>{this.props.errorText.smsCode}</FormHelperText>
            </FormControl>

            <SmsSendWrap
              hide={this.props.alreadySendMsg}
              >
              <ShortButton
                onClick={this.sendMsg}
                >
                发送
              </ShortButton>
            </SmsSendWrap>

            <SmsSendWrap
              hide={!this.props.alreadySendMsg}
              >
              <ShortButton
                raised
                disabled={true}
                >
                {this.props.second}s
              </ShortButton>
            </SmsSendWrap>
          </TextFieldWrap>

          <FormControl
            error={this.props.errorText.password}
            fullWidth={true}
            margin={'dense'}
            >
            <InputLabel htmlFor='password'>密码</InputLabel>
            <Input
              onBlur={this.getPassword}
              type='password'
            />
            <FormHelperText>{this.props.errorText.password}</FormHelperText>
          </FormControl>

          <TextFieldWrap
            hide={this.props.hideUsername}>

            <FormControl
              error={this.props.errorText.passwordConsistent}
              fullWidth={true}
              margin={'dense'}
              >
              <InputLabel htmlFor='passwordConsistent'>确认密码</InputLabel>
              <Input
                onBlur={this.getPasswordConsistent}
                type='password'
              />
              <FormHelperText>{this.props.errorText.passwordConsistent}</FormHelperText>
            </FormControl>
          </TextFieldWrap>

          <ButtonsWrap hide={this.props.hideUsername}>
            <ActionButton
              raised
              type='submit'
              >
              登录
            </ActionButton>
            <Button
              onClick={this.alter}
              type="reset"
              >
                {this.props.hideUsername ? '我是老用户' : '手机号登录'}
            </Button>
          </ButtonsWrap>
        </FromWrap>

        <Footer />
      </LoginWrap>
    )
  }
}

export default Login
