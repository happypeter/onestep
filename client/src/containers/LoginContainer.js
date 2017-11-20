import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'
import { login } from '../redux/actions/authAction'
import {
  formErrInit,
  passwordIsRequired,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  sendMsg,
  countdown,
  readyToSendMsg,
  alter
} from '../redux/actions/formAction'
import PropTypes from 'prop-types'

class LoginContainer extends Component {

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

  checkPhoneNum = (phoneNum) => {
    const phoneNumPattern =  /^1\d{10}$/
    if (!phoneNumPattern.test(phoneNum)) {
      this.props.phoneNumNotValid()
    } else {
      this.props.phoneNumIsValid()
    }
  }

  checkPassword = (password) => {
    if (!password) {
      this.props.passwordIsRequired()
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

  checkSmsCode = (smsCode) => {
    if (!smsCode) {
      this.props.smsCodeIsRequired()
    } else {
      this.props.smsCodeIsValid()
    }
  }

  timer = () => {
      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(
          () => {
            this.props.countdown()
            // console.log(this.props.loginState.second)
            if (this.props.loginState.second <= 0) {
              this.props.readyToSendMsg()
              console.log(this.props.loginState)
              resolve(setTimer)
            }
          }
          , 1000)
      })
      promise.then((setTimer) => {
        console.log('CLEAR INTERVAL')
        clearInterval(setTimer)
      })
    }

  sendMsg = (phoneNum) => {
    console.log('SEND MESSAGE SMS CODE')
    this.checkPhoneNum(phoneNum)
    if (!this.props.loginState.phoneNumIsValid) {
      console.log('phoneNum is not valid')
      return
    }

    this.props.sendMsg(phoneNum)
    this.timer()
  }

  alter = () => {
    this.props.formErrInit()
    this.props.alter()
  }

  recheckForm = function *() {
    let userInfo = yield

    let { username, password, passwordConsistent, phoneNum, smsCode } = userInfo
    this.checkUsername(username)
    this.checkPhoneNum(phoneNum)
    this.checkSmsCode(smsCode)
    this.checkPassword(password)
    this.checkpasswordConsistent({password, passwordConsistent})

    yield
    let { hideUsername, usernameIsValid, phoneNumIsValid, passwordIsValid, passwordConsistentIsValid, smsCodeIsValid } = this.props.loginState

    if (
        (hideUsername && phoneNumIsValid && passwordIsValid)
        ||
        (!hideUsername && phoneNumIsValid && smsCodeIsValid && usernameIsValid && passwordIsValid && passwordConsistentIsValid)
      ) {
      console.log('通过验证')

      this.props.login(userInfo)
    } else {
      console.log('未通过验证')
    }
  }

  handleSubmit = (userInfo) => {
    let foo = this.recheckForm()
    foo.next()
    foo.next(userInfo)
    setTimeout(() => {
        foo.next()
    },
      50
    )
  }

  render () {
    const { isAuthenticated } = this.props.currentUser
    const refererState = this.props.location.state

    let refererPath
    if (!refererState || !refererState.from) {
      // console.log('home')
      refererPath = '/'
    } else if (refererState.from.pathname) {
      // console.log('direct; course')
      refererPath = refererState.from.pathname
    } else {
      // console.log('from wc; course')
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
        checkPhoneNum={this.checkPhoneNum}
        checkPassword={this.checkPassword}
        checkpasswordConsistent={this.checkpasswordConsistent}
        checkSmsCode={this.checkSmsCode}
        sendMsg={this.sendMsg}
        alter={this.alter}
        errorText={this.props.loginState.testErrObj}
        hideUsername={this.props.loginState.hideUsername}
        alreadySendMsg={this.props.loginState.alreadySendMsg}
        second={this.props.loginState.second}
      />
    )
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  passwordIsRequired: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  passwordsInconsistent: PropTypes.func.isRequired,
  passwordsConsistent: PropTypes.func.isRequired,
  usernameIsRequired: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired,
  phoneNumNotValid: PropTypes.func.isRequired,
  phoneNumIsValid: PropTypes.func.isRequired,
  smsCodeIsRequired: PropTypes.func.isRequired,
  smsCodeIsValid: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
  alter: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  readyToSendMsg: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth,
  loginState: state.form
})

export default connect(mapStateToProps, {
  login,
  formErrInit,
  passwordIsRequired,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  sendMsg,
  countdown,
  readyToSendMsg,
  alter
})(LoginContainer)
