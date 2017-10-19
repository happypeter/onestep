import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Signup from '../components/Signup/Signup'

class SignupContainer extends Component {
  state = {
    usernameIsValed: true,
    mailboxIsValed: true,
    passwordIsValed: false,
    passwordConfirmIsValed: false,
    testErrObj: {
      username: '',
      mailbox: '',
      password: '',
      passwordConfirm: ''
    }
  }

  checkPassword= (password) => {
    console.log(password)
    if (password.length < 6) {
      this.setState({
        passwordIsValed: false,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '请输入6位以上的密码',
          passwordConfirm: ''
        }
      })
    } else {
      this.setState({
        passwordIsValed: true,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConfirm: ''
        }
      })
    }
  }

  checkpasswordConfirm = (passwords) => {
    if (passwords.passwordConfirm !== passwords.password) {
      this.setState({
        passwordConfirmIsValed: false,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConfirm: '两次密码不相同'
        }
      })
    } else {
      this.setState({
        passwordConfirmIsValed: true,
        testErrObj: {
          username: '',
          mailbox: '',
          password: '',
          passwordConfirm: ''
        }
      })
    }
  }

  handleSubmit = (userInfo) => {
    console.log(userInfo);
    if (this.state.usernameIsValed && this.state.mailboxIsValed && this.state.passwordIsValed && this.state.passwordConfirmIsValed) {
      console.log("通过验证");
      this.props.dispatch({ type: 'AUTH_USER', userInfo: userInfo})
    } else {
      console.log("未通过验证");
    }
  }

  render () {
    const { isAuthenticated } = this.props.currentUser
    const refererState = this.props.location.state

    let refererPath
    if (!refererState || !refererState.from) {
      console.log('home')
      refererPath = '/'
    } else if (refererState.from.pathname) {
      console.log('direct; course')
      refererPath = refererState.from.pathname
    } else {
      console.log('from wc; course')
      refererPath = refererState.from.from.pathname
    }

    if (isAuthenticated) {
      return (
        <Redirect to={refererPath} />
      )
    }
    return (
      <Signup
        onSubmit={this.handleSubmit}
        checkPassword={this.checkPassword}
        checkpasswordConfirm={this.checkpasswordConfirm}
        errorText={this.state.testErrObj}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth
})

export default connect(mapStateToProps)(SignupContainer)
