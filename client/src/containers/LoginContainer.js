import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'
import { login,
  passwordIsRequired,
  passwordIsValid,
  usernameIsRequired,
  usernameIsValid
 } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class LoginContainer extends Component {

  checkUsername = (username) => {
    if (!username) {
      this.props.usernameIsRequired()
    } else {
      this.props.usernameIsValid()
    }
  }

  checkPassword = (password) => {
    if (!password) {
      this.props.passwordIsRequired()
    } else {
      this.props.passwordIsValid()
    }
  }

  handleSubmit = (userInfo) => {
    if (this.props.loginState.usernameIsValid && this.props.loginState.passwordIsValid) {
      console.log('通过验证')
      console.log(userInfo)
      this.props.login(userInfo)
    } else {
      if (!this.props.loginState.usernameIsValid) {
        this.props.usernameIsRequired()
      }
      if (!this.props.loginState.passwordIsValid) {
        this.props.passwordIsRequired()
      }
      console.log('未通过验证')
    }
  }

  render () {
    console.log(this.props);
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
      <Login
        onSubmit={this.handleSubmit}
        checkUsername={this.checkUsername}
        checkPassword={this.checkPassword}
        errorText={this.props.loginState.testErrObj}
      />
    )
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  passwordIsRequired: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  usernameIsRequired: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth,
  loginState: state.form
})

export default connect(mapStateToProps, {
  login,
  passwordIsRequired,
  passwordIsValid,
  usernameIsRequired,
  usernameIsValid
})(LoginContainer)
