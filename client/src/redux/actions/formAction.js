import axios from 'axios'
import config from '../../config/config'

export function formErrInit (data) {
  return dispatch => {
    dispatch({
      type: 'FORM_ERR_INIT'
    })
  }
}

export function phoneNumNotValid (data) {
  return dispatch => {
    dispatch({
      type: 'PHONE_NUM_NOT_VALID'
    })
  }
}

export function phoneNumIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'PHONE_NUM_IS_VALID'
    })
  }
}

export function usernameIsRequired (data) {
  return dispatch => {
    dispatch({
      type: 'USERNAME_IS_REQUIRED'
    })
  }
}

export function usernameIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'USERNAME_IS_VALID'
    })
  }
}

export function passwordIsRequired (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORD_IS_REQUIRED'
    })
  }
}

export function passwordTooShort (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORD_TOO_SHORT'
    })
  }
}

export function passwordIsValid (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORE_IS_VALID'
    })
  }
}

export function passwordsInconsistent (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORDS_INCONSISTENT'
    })
  }
}

export function passwordsConsistent (data) {
  return dispatch => {
    dispatch({
      type: 'PASSWORDS_CONSISTENT'
    })
  }
}

export function smsCodeIsRequired () {
  return dispatch => {
    dispatch({
      type: 'SMSCODE_IS_REQUIRED'
    })
  }
}

export function smsCodeIsValid () {
  return dispatch => {
    dispatch({
      type: 'SMSCODE_IS_VALID'
    })
  }
}

export function alter () {
  return dispatch => {
    dispatch({
      type: 'ALTER'
    })
  }
}

export function sendMsg (phoneNum) {
  return dispatch => {
    axios.post(`${config.api + '/msg'}`, { phoneNum: phoneNum })
         .then(
           res => {
             // console.log(res)
           }
         )
         .catch(
           err => {
             console.log(err)
             dispatch({ type: 'SMS_ERR_TRY_AGAIN' })
           }
         )
    dispatch({ type: 'ALREADY_SEND_MSG' })
  }
}

export function countdown () {
  return dispatch => {
    dispatch({ type: 'COUNTDOWN' })
  }
}

export function readyToSendMsg () {
  return dispatch => {
    dispatch({ type: 'READY_TO_SEND_MSG' })
  }
}
