import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'

const SignupWrap = styled.div`
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
  margin-top: 5%;
  @media (min-width: 400px): {
    width: 400px;
    margin: 30px auto;
  }
`

const RaisedButtonWrap = styled(RaisedButton)`
  width: 130px;
  margin-top: 30px;
`

class Signup extends Component {

  checkPassword = () => {
    let password = this.refs.password.getValue()
    this.props.checkPassword(password)
  }

  checkpasswordConfirm = () => {
    let password = this.refs.password.getValue()
    let passwordConfirm = this.refs.passwordConfirm.getValue()
    this.props.checkpasswordConfirm({password, passwordConfirm})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.refs.password.props);
    let username = this.refs.username.getValue()
    let mailbox = this.refs.mailbox.getValue()
    let password = this.refs.password.getValue()
    let passwordConfirm = this.refs.passwordConfirm.getValue()
    this.props.onSubmit({username, mailbox, password, passwordConfirm})
  }

  render () {
    return (
      <SignupWrap>
        <TopHeader />
        <FromWrap onSubmit={this.handleSubmit}>
          <TextField
            ref='username'
            errorText={this.props.errorText.username}
            floatingLabelText='用户名'
          />
          <TextField
            ref='mailbox'
            errorText={this.props.errorText.mailbox}
            floatingLabelText='邮箱'
          />
          <TextField
            ref='password'
            onBlur={this.checkPassword}
            errorText={this.props.errorText.password}
            floatingLabelText='密码'
            type='password'
          />
          <TextField
            ref='passwordConfirm'
            onBlur={this.checkpasswordConfirm}
            errorText={this.props.errorText.passwordConfirm}
            floatingLabelText='确认密码'
            type='password'
          />
          <RaisedButtonWrap
            secondary={true}
            type='submit'
            label='注册'
          />
        </FromWrap>
        <Footer />
      </SignupWrap>
    )
  }
}

export default Signup
