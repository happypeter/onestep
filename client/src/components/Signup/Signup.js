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

  checkUsername = () => {
    let username = this.refs.username.getValue().trim()
    this.props.checkUsername(username)
  }

  checkMailbox = () => {
    let mailbox = this.refs.mailbox.getValue().trim()
    this.props.checkMailbox(mailbox)
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

  handleSubmit = (e) => {
    e.preventDefault()
    let username = this.refs.username.getValue().trim()
    let mailbox = this.refs.mailbox.getValue().trim()
    let password = this.refs.password.getValue()
    let passwordConsistent = this.refs.passwordConsistent.getValue()
    this.props.onSubmit({username, mailbox, password, passwordConsistent})
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
            onBlur={this.checkUsername}
          />
          <TextField
            ref='mailbox'
            errorText={this.props.errorText.mailbox}
            floatingLabelText='邮箱'
            onBlur={this.checkMailbox}
          />
          <TextField
            ref='password'
            onBlur={this.checkPassword}
            errorText={this.props.errorText.password}
            floatingLabelText='密码'
            type='password'
          />
          <TextField
            ref='passwordConsistent'
            onBlur={this.checkpasswordConsistent}
            errorText={this.props.errorText.passwordConsistent}
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
