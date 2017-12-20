import React, { Component } from 'react'
import Button from 'material-ui/Button'
import FormItem from '../common/FormItem'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import styled from 'styled-components'

class ResetPassword extends Component {

  getPassword = (e) => {
    this.props.getPassword(e.target.value)
  }

  getPasswordConsistent = (e) => {
    if (typeof e === 'string') {
      this.props.getPasswordConsistent(e)
      return
    }
    this.props.getPasswordConsistent(e.target.value)
  }

  getSmsCode = (e) => {
    this.props.getSmsCode(e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit()
  }

  enterToSubmit = (e) => {
    if (e.which !== 13) return
    this.getPasswordConsistent(e.target.value)
  }

  render () {
    return (
      <SignupWrap>
        <FormTitle>修改密码</FormTitle>
        <FromWrap onSubmit={this.handleSubmit}>

          <FormItem
            error={this.props.errorText.phoneNum}
            disabled={true}
            value={this.props.phoneNum}
            htmlFor={'phoneNum'}
            inputLabel={this.props.phoneNum}
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
            inputLabel={'新密码'}
            onBlur={this.getPassword}
            type={'password'}
            formHelperText={this.props.errorText.password}
          />

          <FormItem
            error={this.props.errorText.passwordConsistent}
            htmlFor={'passwordConsistent'}
            inputLabel={'确认新密码'}
            onBlur={this.getPasswordConsistent}
            onKeyDown={this.enterToSubmit}
            type={'password'}
            formHelperText={this.props.errorText.passwordConsistent}
          />

          <ActionButton
            raised
            type='submit'
          >
            重置密码
          </ActionButton>
        </FromWrap>
      </SignupWrap>
    )
  }
}

export default ResetPassword

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FormTitle = styled.div`
  margin: 0 auto;
  margin-top: 105px;
  font-size: 40px;
  color: #212121;
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
    margin: 40px auto;
    margin-bottom: 280px;
    padding: 0 80px 20px;
  }
`

const TextFieldWrap = styled.div`
  display: flex;
  width: 100%;
`

const ActionButton = styled(Button)`
  && {
    background-color: #00BCD4;
    color: #FFFFFF;
    width: 100%;
    margin-top: 1.5em;
  }
`
