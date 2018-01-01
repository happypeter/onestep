import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import Button from 'material-ui/Button'
import FormItem from '../common/FormItem'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import styled from 'styled-components'

class Signup extends Component {
  getPhoneNum = e => {
    this.props.getPhoneNum(e.target.value)
  }

  getSmsCode = e => {
    this.props.getSmsCode(e.target.value)
  }

  getPassword = e => {
    this.props.getPassword(e.target.value)
  }

  getPasswordConsistent = e => {
    if (typeof e === 'string') {
      this.props.getPasswordConsistent(e)
      return
    }
    this.props.getPasswordConsistent(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit()
  }

  enterToSubmit = e => {
    if (e.which !== 13) return
    this.getPasswordConsistent(e.target.value)
  }

  render() {
    return (
      <SignupWrap>
        <TopHeader />
        <FromWrap onSubmit={this.handleSubmit}>
          <FormItem
            error={this.props.errorText.phoneNum}
            htmlFor={'phoneNum'}
            inputLabel={'手机号'}
            onBlur={this.getPhoneNum}
            formHelperText={this.props.errorText.phoneNum}
          />

          <TextFieldWrap>
            <FormItem
              error={this.props.errorText.smsCode}
              htmlFor={'smsCode'}
              inputLabel={'验证码'}
              onBlur={this.getSmsCode}
              formHelperText={this.props.errorText.smsCode}
            />
            <SmsSendContainer
              phoneNumIsValid={this.props.phoneNumIsValid}
              phoneNum={this.props.phoneNum}
            />
          </TextFieldWrap>

          <FormItem
            error={this.props.errorText.password}
            htmlFor={'password'}
            inputLabel={'密码'}
            onBlur={this.getPassword}
            type={'password'}
            formHelperText={this.props.errorText.password}
          />

          <FormItem
            error={this.props.errorText.passwordConsistent}
            htmlFor={'passwordConsistent'}
            inputLabel={'确认密码'}
            onBlur={this.getPasswordConsistent}
            onKeyDown={this.enterToSubmit}
            type={'password'}
            formHelperText={this.props.errorText.passwordConsistent}
          />

          <ActionButton raised type="submit">
            注册
          </ActionButton>
        </FromWrap>
        <Footer />
      </SignupWrap>
    )
  }
}

export default Signup

const SignupWrap = styled.div`
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
  border-top: 2.5em solid #00bcd4;
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
  display: flex;
  width: 100%;
`

const ActionButton = styled(Button)`
  && {
    background-color: #00bcd4;
    color: #ffffff;
    width: 100%;
    margin-top: 1.5em;
  }
`
