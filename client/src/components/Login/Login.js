import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Tabs, { Tab } from 'material-ui/Tabs';
import styled from 'styled-components'

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

const SmsSendWrap = styled.div`
  display: ${props => props.hide ? 'none' : 'inline-block'}
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

  alter = (event, value) => {
    this.props.alter({ value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit()
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
            indicatorColor="#00BCD4"
            centered
            >
              <Tab label="手机登录" />
              <Tab label="老用户" />
          </TabsWrap>
          {value === 0 &&
          <FromWrap  onSubmit={this.handleSubmit}>

            <FormControl
              error={this.props.errorText.phoneNum}
              fullWidth={true}
              margin={'dense'}
              >
                <InputLabel
                  htmlFor='phoneNum'
                  >
                    {true ? '手机号' : '请绑定手机号'}
                </InputLabel>
                <Input onBlur={this.getPhoneNum} />
                <FormHelperText>{this.props.errorText.phoneNum}</FormHelperText>
            </FormControl>

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
                   {false ? '手机号' : '请绑定手机号'}
                 </InputLabel>
                 <Input onBlur={this.getPhoneNum} />
                 <FormHelperText>{this.props.errorText.phoneNum}</FormHelperText>
            </FormControl>

            <TextFieldWrap>
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

                <TextFieldWrap>

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
