import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import Button from 'material-ui/Button'
import FormItem from '../common/FormItem'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import Tabs, {Tab} from 'material-ui/Tabs'
import styled from 'styled-components'

class Login extends Component {
  getUsername = e => {
    this.props.getUsername(e.target.value)
  }

  getPhoneNum = e => {
    this.props.getPhoneNum(e.target.value)
  }

  getPassword = e => {
    if (typeof e === 'string') {
      this.props.getPassword(e)
      return
    }
    this.props.getPassword(e.target.value)
  }

  getPasswordConsistent = e => {
    if (typeof e === 'string') {
      this.props.getPasswordConsistent(e)
      return
    }
    this.props.getPasswordConsistent(e.target.value)
  }

  getSmsCode = e => {
    this.props.getSmsCode(e.target.value)
  }

  alter = (event, value) => {
    this.props.alter({value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit()
  }

  enterToSubmitPhone = event => {
    if (event.which !== 13) return
    this.getPassword(event.target.value)
  }

  enterToSubmitRegularUser = event => {
    if (event.which !== 13) return
    this.getPasswordConsistent(event.target.value)
  }

  render() {
    const value = this.props.tabValue

    return (
      <Wrap>
        <TopHeader />
        <Content>
          <Container>
            <Title>登录</Title>
            <TabsWrap
              value={value}
              onChange={this.alter}
              indicatorColor="primary">
              <Tab label="手机登录" />
              <Tab label="老用户" />
            </TabsWrap>
            {value === 0 && (
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  error={this.props.errorText.phoneNum}
                  htmlFor="phoneNum"
                  inputLabel="手机号"
                  onBlur={this.getPhoneNum}
                  formHelperText={this.props.errorText.phoneNum}
                />

                <FormItem
                  error={this.props.errorText.password}
                  htmlFor="password"
                  inputLabel="密码"
                  onBlur={this.getPassword}
                  onKeyDown={this.enterToSubmitPhone}
                  type="password"
                  formHelperText={this.props.errorText.password}
                />

                <ActionButton type="submit">登录</ActionButton>
              </Form>
            )}
            {value === 1 && (
              <Form onSubmit={this.handleSubmit}>
                <TextFieldWrap>
                  <FormItem
                    error={this.props.errorText.username}
                    htmlFor="username"
                    inputLabel="用户名"
                    onBlur={this.getUsername}
                    formHelperText={this.props.errorText.username}
                  />
                </TextFieldWrap>

                <FormItem
                  error={this.props.errorText.phoneNum}
                  htmlFor="phoneNum"
                  inputLabel="请绑定手机号"
                  onBlur={this.getPhoneNum}
                  formHelperText={this.props.errorText.phoneNum}
                />

                <TextFieldWrap>
                  <FormItem
                    error={this.props.errorText.smsCode}
                    htmlFor="smsCode"
                    inputLabel="验证码"
                    onBlur={this.getSmsCode}
                    formHelperText={this.props.errorText.smsCode}
                  />
                  <SmsSendContainer
                    phoneNumIsValid={this.props.phoneNumIsValid}
                    phoneNum={this.props.phoneNum}
                    checkUserExist={true}
                  />
                </TextFieldWrap>

                <FormItem
                  error={this.props.errorText.password}
                  htmlFor="password"
                  inputLabel="密码"
                  onBlur={this.getPassword}
                  type="password"
                  formHelperText={this.props.errorText.password}
                />

                <TextFieldWrap>
                  <FormItem
                    error={this.props.errorText.passwordConsistent}
                    htmlFor="passwordConsistent"
                    inputLabel="确认密码"
                    onBlur={this.getPasswordConsistent}
                    onKeyDown={this.enterToSubmitRegularUser}
                    type="password"
                    formHelperText={this.props.errorText.passwordConsistent}
                  />
                </TextFieldWrap>

                <ActionButton type="submit">登录</ActionButton>
              </Form>
            )}
          </Container>
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

export default Login

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  flex-grow: 1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px #888888;
  margin: 32px auto;
  width: 100%;
  max-width: 390px;
`

const Title = styled.div`
  background-color: #00bcd4;
  text-align: center;
  font-size: 18px;
  padding: 16px 0;
  color: #fff;
  letter-spacing: 1.5;
  font-weight: 500;
`

const TabsWrap = styled(Tabs)`
  && {
    padding: 0 32px;
  }

  span {
    font-size: 16px;
  }
`

const Form = styled.form`
  padding: 16px 32px;
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
