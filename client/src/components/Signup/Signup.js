import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import Button from 'material-ui/Button'
import FormItem from '../common/FormItem'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import styled from 'styled-components'
import WeChat from '../oauth/WeChat'

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
      <Wrap>
        <TopHeader />
        <Content>
          <Container onSubmit={this.handleSubmit}>
            <Title>注册</Title>
            <Form>
              <FormItem
                error={this.props.errorText.phoneNum}
                htmlFor="phoneNum"
                inputLabel="手机号"
                onBlur={this.getPhoneNum}
                formHelperText={this.props.errorText.phoneNum}
              />

              <Row>
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
              </Row>

              <FormItem
                error={this.props.errorText.password}
                htmlFor="password"
                inputLabel="密码"
                onBlur={this.getPassword}
                type="password"
                formHelperText={this.props.errorText.password}
              />

              <FormItem
                error={this.props.errorText.passwordConsistent}
                htmlFor="passwordConsistent"
                inputLabel="确认密码"
                onBlur={this.getPasswordConsistent}
                onKeyDown={this.enterToSubmit}
                type="password"
                formHelperText={this.props.errorText.passwordConsistent}
              />

              <ActionButton type="submit">注册</ActionButton>
            </Form>
            <WeChat />
          </Container>
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

export default Signup

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

const Form = styled.form`
  padding: 16px 32px;
`

const Row = styled.div`
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
