import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Signup from '../components/Signup/Signup'
import { signup } from '../redux/actions/authAction'
import {
  formErrInit,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  mailboxNotValid,
  mailboxIsValid } from '../redux/actions/formAction'
import PropTypes from 'prop-types'

class SignupContainer extends Component {

  componentWillMount(){
    this.props.formErrInit()
  }

  checkUsername = (username) => {
    if (!username) {
      this.props.usernameIsRequired()
    } else {
      this.props.usernameIsValid()
    }
  }

  checkMailbox = (mailbox) => {
    const mailboxPattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if (!mailboxPattern.test(mailbox)) {
      this.props.mailboxNotValid()
    } else {
      this.props.mailboxIsValid()
    }
  }

  checkPassword = (password) => {
    if (password.length < 6) {
      this.props.passwordTooShort()
    } else {
      this.props.passwordIsValid()
    }
  }

  checkpasswordConsistent = (passwords) => {
    if (passwords.passwordConsistent !== passwords.password) {
      this.props.passwordsInconsistent()
    } else {
      this.props.passwordsConsistent()
    }
  }

  recheckForm = function *() {
    let userInfo = yield

    let {username, mailbox, password, passwordConsistent} = userInfo
    this.checkUsername(username)
    this.checkMailbox(mailbox)
    this.checkPassword(password)
    this.checkpasswordConsistent({password, passwordConsistent})

    yield
    if (this.props.signUpState.usernameIsValid && this.props.signUpState.mailboxIsValid && this.props.signUpState.passwordIsValid && this.props.signUpState.passwordConsistentIsValid) {
      console.log('通过验证')
      console.log(userInfo)
      this.props.signup(userInfo)
    } else {
      if (!this.props.signUpState.usernameIsValid) {
        this.props.usernameIsRequired()
      }
      if (!this.props.signUpState.mailboxIsValid) {
        this.props.mailboxNotValid()
      }
      if (!this.props.signUpState.passwordIsValid) {
        this.props.passwordTooShort()
      }
      if (!this.props.signUpState.passwordConsistentIsValid) {
        this.props.passwordsInconsistent()
      }
      console.log('未通过验证')
    }
  }


  handleSubmit = (userInfo) => {
    let recheck = this.recheckForm()
    recheck.next()
    console.log(userInfo);
    recheck.next(userInfo)
    setTimeout(() => {
      recheck.next()
    }, 50)
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
        checkUsername={this.checkUsername}
        checkMailbox={this.checkMailbox}
        checkPassword={this.checkPassword}
        checkpasswordConsistent={this.checkpasswordConsistent}
        errorText={this.props.signUpState.testErrObj}
      />
    )
  }
}

SignupContainer.PropTypes = {
  login: PropTypes.func.isRequired,
  passwordTooShort: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  passwordsInconsistent: PropTypes.func.isRequired,
  passwordsConsistent: PropTypes.func.isRequired,
  usernameIsRequired: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired,
  mailboxNotValid: PropTypes.func.isRequired,
  mailboxIsValid: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth,
  signUpState: state.form
})

export default connect(mapStateToProps, {
  signup,
  formErrInit,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  mailboxNotValid,
  mailboxIsValid
})(SignupContainer)
