import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Signup from '../components/Signup/Signup'

class SignupContainer extends Component {

  checkPassword = (password) => {
    console.log(password)
    if (password.length < 6) {
      console.log("<6");
      this.props.dispatch({
        type: 'PASSWORD_TOO_SHORT'
      })
    } else {
      console.log(">>>");
      this.props.dispatch({
        type: 'PASSWORE_IS_VALID'
      })
    }
  }

  checkpasswordConsistent = (passwords) => {
    if (passwords.passwordConsistent !== passwords.password) {
      this.props.dispatch({
        type: 'PASSWORDS_INCONSISTENT'
      })
    } else {
      this.props.dispatch({
        type: 'PASSWORDS_CONSISTENT'
      })
    }
  }

  handleSubmit = (userInfo) => {
    console.log(userInfo);
    if (this.props.signUpState.usernameIsValid && this.props.signUpState.mailboxIsValid && this.props.signUpState.passwordIsValid && this.props.signUpState.passwordConsistentIsValid) {
      console.log('通过验证')
      this.props.dispatch({
        type: 'AUTH_USER',
        userInfo: userInfo
      })
      window.localStorage.setItem('userInfo', userInfo.username)
    } else {
      console.log('未通过验证')
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
        checkpasswordConsistent={this.checkpasswordConsistent}
        errorText={this.props.signUpState.testErrObj}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth,
  signUpState: state.signUp
})

export default connect(mapStateToProps)(SignupContainer)
