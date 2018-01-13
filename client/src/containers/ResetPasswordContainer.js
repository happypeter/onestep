import React, {Component} from 'react'
import {connect} from 'react-redux'
import ResetPassword from '../components/Profile/ResetPassword'
import {resetPassword} from '../redux/actions/authAction'
import {
  formErrInit,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
} from '../redux/actions/formAction'
import PropTypes from 'prop-types'

class ResetPasswordContainer extends Component {
  state = {
    phoneNum: '',
    smsCode: '',
    password: '',
    passwordConsistent: '',
  }

  componentWillMount() {
    this.props.formErrInit()
    let phoneNum = window.sessionStorage.getItem('user')
    this.setState({
      phoneNum: phoneNum,
      smsCode: '',
      password: '',
      passwordConsistent: '',
    })
  }

  getSmsCode = smsCode => {
    this.setState({
      smsCode: smsCode,
    })
    this.checkSmsCode(smsCode)
  }

  getPassword = password => {
    this.setState({
      password: password,
    })
    this.checkPassword(password)
  }

  getPasswordConsistent = passwordConsistent => {
    this.setState({
      passwordConsistent: passwordConsistent,
    })
    this.checkpasswordConsistent()
  }

  checkPassword = password => {
    if (password.length < 6) {
      this.props.passwordTooShort()
    } else {
      this.props.passwordIsValid()
    }
  }

  checkpasswordConsistent = () => {
    let {password, passwordConsistent} = this.state

    if (passwordConsistent !== password) {
      this.props.passwordsInconsistent()
    } else {
      this.props.passwordsConsistent()
    }
  }

  checkSmsCode = smsCode => {
    if (!smsCode) {
      this.props.smsCodeIsRequired()
    } else {
      this.props.smsCodeIsValid()
    }
  }

  recheckForm = function*() {
    let userInfo = yield

    let {password, passwordConsistent, smsCode} = userInfo
    this.checkSmsCode(smsCode)
    this.checkPassword(password)
    this.checkpasswordConsistent({password, passwordConsistent})

    yield

    let {
      passwordIsValid,
      passwordConsistentIsValid,
      smsCodeIsValid,
    } = this.props.signUpState

    if (smsCodeIsValid && passwordIsValid && passwordConsistentIsValid) {
      console.log('通过验证')

      this.props.resetPassword(userInfo)
    } else {
      console.log('未通过验证')
    }
  }

  handleSubmit = () => {
    let recheck = this.recheckForm()
    recheck.next()

    recheck.next(this.state)
    setTimeout(() => {
      recheck.next()
    }, 50)
  }

  render() {
    return (
      <ResetPassword
        onSubmit={this.handleSubmit}
        phoneNum={this.state.phoneNum}
        getSmsCode={this.getSmsCode}
        getPassword={this.getPassword}
        getPasswordConsistent={this.getPasswordConsistent}
        errorText={this.props.signUpState.testErrObj}
        phoneNumIsValid={true}
      />
    )
  }
}

ResetPasswordContainer.propTypes = {
  passwordTooShort: PropTypes.func.isRequired,
  passwordIsValid: PropTypes.func.isRequired,
  passwordsInconsistent: PropTypes.func.isRequired,
  passwordsConsistent: PropTypes.func.isRequired,
  usernameIsRequired: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired,
  smsCodeIsRequired: PropTypes.func.isRequired,
  smsCodeIsValid: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentUser: state.fakeAuth,
  signUpState: state.form,
})

export default connect(mapStateToProps, {
  resetPassword,
  formErrInit,
  passwordTooShort,
  passwordIsValid,
  passwordsInconsistent,
  passwordsConsistent,
  usernameIsRequired,
  usernameIsValid,
  smsCodeIsRequired,
  smsCodeIsValid,
})(ResetPasswordContainer)
