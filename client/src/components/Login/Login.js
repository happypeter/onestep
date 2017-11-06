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

const RaisedButtonWrap = styled(RaisedButton)`
  width: 130px;
  margin-top: 30px;
`

class Login extends Component {

  checkUsername = () => {
    let username = this.refs.username.getValue().trim()
    this.props.checkUsername(username)
  }

  checkPassword = () => {
    let password = this.refs.password.getValue()
    this.props.checkPassword(password)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    let username = this.refs.username.getValue()
    let password = this.refs.password.getValue()
    this.props.onSubmit({username, password})
  }

  render () {
    return (
      <LoginWrap>
        <TopHeader />
        <FromWrap onSubmit={this.handleSubmit}>
          <TextField
            ref='username'
            floatingLabelText='用户名'
            errorText={this.props.errorText.username}
            onBlur={this.checkUsername}
          />
          <TextField
            ref='password'
            floatingLabelText='密码'
            type='password'
            errorText={this.props.errorText.password}
            onBlur={this.checkPassword}
          />
          <RaisedButtonWrap
            secondary={true}
            type='submit'
            label='登录'
          />
        </FromWrap>
        <Footer />
      </LoginWrap>
    )
  }
}

export default Login
