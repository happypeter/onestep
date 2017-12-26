import * as types from '../../constants/actionTypes/formActionTypes.js'

export function formErrInit (data) {
  return dispatch => {
    dispatch({
      type: types.FORM_ERR_INIT
    })
  }
}

export function phoneNumNotValid (data) {
  return dispatch => {
    dispatch({
      type: types.PHONE_NUM_NOT_VALID
    })
  }
}

export function phoneNumIsValid (data) {
  return dispatch => {
    dispatch({
      type: types.PHONE_NUM_IS_VALID
    })
  }
}

export function usernameIsRequired (data) {
  return dispatch => {
    dispatch({
      type: types.USERNAME_IS_REQUIRED
    })
  }
}

export function usernameIsValid (data) {
  return dispatch => {
    dispatch({
      type: types.USERNAME_IS_VALID
    })
  }
}

export function passwordIsRequired (data) {
  return dispatch => {
    dispatch({
      type: types.PASSWORD_IS_REQUIRED
    })
  }
}

export function passwordTooShort (data) {
  return dispatch => {
    dispatch({
      type: types.PASSWORD_TOO_SHORT
    })
  }
}

export function passwordIsValid (data) {
  return dispatch => {
    dispatch({
      type: types.PASSWORE_IS_VALID
    })
  }
}

export function passwordsInconsistent (data) {
  return dispatch => {
    dispatch({
      type: types.PASSWORDS_INCONSISTENT
    })
  }
}

export function passwordsConsistent (data) {
  return dispatch => {
    dispatch({
      type: types.PASSWORDS_CONSISTENT
    })
  }
}

export function smsCodeIsRequired () {
  return dispatch => {
    dispatch({
      type: types.SMSCODE_IS_REQUIRED
    })
  }
}

export function smsCodeIsValid () {
  return dispatch => {
    dispatch({
      type: types.SMSCODE_IS_VALID
    })
  }
}

export function alter (data) {
  return dispatch => {
    dispatch({
      type: types.ALTER,
      data
    })
  }
}
