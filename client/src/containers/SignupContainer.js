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
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  sendMsg,
  countdown,
  readyToSendMsg
} from '../redux/actions/formAction'
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

  checkPhoneNum = (phoneNum) => {
    const phoneNumPattern =  /^1\d{10}$/
    if (!phoneNumPattern.test(phoneNum)) {
      this.props.phoneNumNotValid()
    } else {
      this.props.phoneNumIsValid()
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
            // console.log(this.props.signUpState.second)
            if (this.props.signUpState.second <= 0) {
              this.props.readyToSendMsg()
              console.log(this.props.signUpState)
              resolve(setTimer)
            }
          }
          , 1000)
      })
      promise.then((setTimer) => {
        clearInterval(setTimer)
        console.log('CLEAR INTERVAL')
      })
      .catch(
        err => {
          console.log(err)
        }
      )
    }

  sendMsg = (phoneNum) => {
    this.checkPhoneNum(phoneNum)
    if (!this.props.signUpState.phoneNumIsValid) {
      console.log('phoneNum is not valid')
      return
    }

    this.props.sendMsg(phoneNum)
    this.timer()
  }

  recheckForm = function *() {
    let userInfo = yield

    let { username, phoneNum, password, passwordConsistent, smsCode } = userInfo
    this.checkUsername(username)
    this.checkPhoneNum(phoneNum)
    this.checkSmsCode(smsCode)
    this.checkPassword(password)
    this.checkpasswordConsistent({password, passwordConsistent})

    yield

    let { phoneNumIsValid, passwordIsValid, passwordConsistentIsValid, smsCodeIsValid } = this.props.signUpState

    if (phoneNumIsValid && smsCodeIsValid && passwordIsValid && passwordConsistentIsValid) {
      console.log('通过验证')

      this.props.signup(userInfo)
    } else {
      console.log('未通过验证')
    }
  }


  handleSubmit = (userInfo) => {
    let recheck = this.recheckForm()
    recheck.next()
    // console.log(userInfo);
    recheck.next(userInfo)
    setTimeout(() => {
      recheck.next()
      // console.log(this.props.signUpState);
    }, 50)
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
      <Signup
        onSubmit={this.handleSubmit}
        checkUsername={this.checkUsername}
        checkPhoneNum={this.checkPhoneNum}
        checkPassword={this.checkPassword}
        checkpasswordConsistent={this.checkpasswordConsistent}
        checkSmsCode={this.checkSmsCode}
        errorText={this.props.signUpState.testErrObj}
        sendMsg={this.sendMsg}
        alreadySendMsg={this.props.signUpState.alreadySendMsg}
        second={this.props.signUpState.second}
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
  phoneNumNotValid: PropTypes.func.isRequired,
  phoneNumIsValid: PropTypes.func.isRequired,
  smsCodeIsRequired: PropTypes.func.isRequired,
  smsCodeIsValid: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  readyToSendMsg: PropTypes.func.isRequired
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
  phoneNumNotValid,
  phoneNumIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
  sendMsg,
  countdown,
  readyToSendMsg
})(SignupContainer)
