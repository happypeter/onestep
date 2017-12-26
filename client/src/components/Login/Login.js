import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import Button from 'material-ui/Button'
import FormItem from '../common/FormItem'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import Tabs, { Tab } from 'material-ui/Tabs'
import styled from 'styled-components'

class Login extends Component {

  getUsername = (e) => {
    this.props.getUsername(e.target.value)
  }

  getPhoneNum = (e) => {
    this.props.getPhoneNum(e.target.value)
  }

  getPassword = (e) => {
    if (typeof e === 'string') {
      this.props.getPassword(e)
      return
    }
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

  alter = (event, value) => {
    this.props.alter({ value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit()
  }

  enterToSubmitPhone = (event) => {
    if (event.which !== 13) return
    this.getPassword(event.target.value)
  }

  enterToSubmitRegularUser = (event) => {
    if (event.which !== 13) return
    this.getPasswordConsistent(event.target.value)
  }

  render () {
    const value = this.props.tabValue

    return (
      <LoginWrap>
        <TopHeader />
        <CardWarp>
          <TabsHeader />
          <TabsWrap
            value={value}
            onChange={this.alter}
            indicatorColor={'primary'}
            centered
            >
              <Tab label={'手机登录'} />
              <Tab label={'老用户'} />
          </TabsWrap>
          {value === 0 &&
          <FromWrap  onSubmit={this.handleSubmit}>

            <FormItem
              error={this.props.errorText.phoneNum}
              htmlFor={'phoneNum'}
              inputLabel={'手机号'}
              onBlur={this.getPhoneNum}
              formHelperText={this.props.errorText.phoneNum}
            />

            <FormItem
              error={this.props.errorText.password}
              htmlFor={'password'}
              inputLabel={'密码'}
              onBlur={this.getPassword}
              onKeyDown={this.enterToSubmitPhone}
              type={'password'}
              formHelperText={this.props.errorText.password}
            />

            <ActionButton
              raised
              type='submit'
              >
              登录
            </ActionButton>

      </FromWrap>
      }
      {value === 1 &&
      <FromWrap  onSubmit={this.handleSubmit}>
         <TextFieldWrap>
           <FormItem
             error={this.props.errorText.username}
             htmlFor={'username'}
             inputLabel={'用户名'}
             onBlur={this.getUsername}
             formHelperText={this.props.errorText.username}
           />
           </TextFieldWrap>

           <FormItem
             error={this.props.errorText.phoneNum}
             htmlFor={'phoneNum'}
             inputLabel={'请绑定手机号'}
             onBlur={this.getPhoneNum}
             formHelperText={this.props.errorText.phoneNum}
           />

            <TextFieldWrap>
              <FormItem
                error={this.props.errorText.smsCode}
                htmlFor={'smsCode'}
                inputLabel='验证码'
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

              <TextFieldWrap>
                <FormItem
                  error={this.props.errorText.passwordConsistent}
                  htmlFor={'passwordConsistent'}
                  inputLabel={'确认密码'}
                  onBlur={this.getPasswordConsistent}
                  onKeyDown={this.enterToSubmitRegularUser}
                  type={'password'}
                  formHelperText={this.props.errorText.passwordConsistent}
                />

              </TextFieldWrap>

              <ActionButton
                raised
                type='submit'
              >
                登录
              </ActionButton>
            </FromWrap>
          }
          </CardWarp>
          <Footer />
        </LoginWrap>
      )
    }
}

export default Login

const CardWarp = styled.div`
  padding: 0;
  box-shadow: 2px 2px 5px #888888;
  width: 380px;
  margin: 0 auto 80px auto;
  padding: 0;
`

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const TabsHeader = styled.div`
  margin: 0 auto;
  margin-bottom: 2em;
  width: 380px;
  height: 2.5em;
  background-color: #00BCD4;
  flex-shrink: 0;
`

const TabsWrap = styled(Tabs)`
  && {
    margin: 0 80px;
    display: flex;
    justify-content:center;
    flex-shrink: 1;
  }

  .MuiTab-root-8 {
    min-width: 10px;
    margin: 0 5px;
    font-weight: 400;
  }

  .MuiTabs-root-213 .sc-jzJRlG .crlNmy {
    margin: 25px;
  }

  span {
    font-size: 16px;
  }
`

const FromWrap = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
  margin-top: 5%;
  padding: 0 60px;
  @media (min-width: 400px) {
    width: 380px;
    margin: 1em auto 0 auto;
    padding: 0 80px 4em;
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
