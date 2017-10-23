import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Signup from '../components/Signup/Signup'
import { signup,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class SignupContainer extends Component {

  checkPassword = (password) => {
    console.log(password)
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

  handleSubmit = (userInfo) => {
    console.log(userInfo);
    if (this.props.signUpState.usernameIsValid && this.props.signUpState.mailboxIsValid && this.props.signUpState.passwordIsValid && this.props.signUpState.passwordConsistentIsValid) {
      console.log('通过验证')
      this.props.signup(userInfo)
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

SignupContainer.PropTypes = {
  login: PropTypes.func.isRequired,
  passwordTooShort: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  passwordsInconsistent: PropTypes.func.isRequired,
  passwordsConsistent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth,
  signUpState: state.signUp
})

export default connect(mapStateToProps, {
  signup,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent
})(SignupContainer)
