import * as types from '../../constants/actionTypes/notificationActionTypes.js'

// for authAction
export function showLoginNotification(dispatch) {
  dispatch({type: types.SHOW_LOGIN_NOTIFICATION})
  setTimeout(function() {
    dispatch({type: types.RM_LOGIN_NOTIFICATION})
  }, 4000)
}

export function showSignupNotification(dispatch) {
  dispatch({type: types.SHOW_SIGNUP_NOTIFICATION})
  setTimeout(function() {
    dispatch({type: types.RM_SIGNUP_NOTIFICATION})
  }, 4000)
}

export function showLogoutNotification(dispatch) {
  dispatch({type: types.SHOW_LOGOUT_NOTIFICATION})
  setTimeout(function() {
    dispatch({type: types.RM_LOGOUT_NOTIFICATION})
  }, 4000)
}

export function showInvalidTokenNotification(dispatch) {
  dispatch({type: types.SHOW_INVALID_TOKEN_NOTIFICATION})
  setTimeout(() => {
    dispatch({type: types.RM_INVALID_TOKEN_NOTIFICATION})
  }, 4000)
}

export function showResetPasswordNotification(dispatch) {
  dispatch({type: types.SHOW_RESET_PASSWORD_NOTIFICATION})
  setTimeout(() => {
    dispatch({type: types.RM_RESET_PASSWORD_NOTIFICATION})
  }, 4000)
}

export function showUnhandledErrNotification(dispatch) {
  dispatch({type: types.SHOW_UNHANDLED_ERR_NOTIFICATION})
  setTimeout(() => {
    dispatch({type: types.RM_UNHANDLED_ERR_NOTIFICATION})
  }, 4000)
}

// for react components
export function showNotPaidNotification() {
  return dispatch => {
    dispatch({type: types.SHOW_NOT_PAID_NOTIFICATION})
    setTimeout(() => {
      dispatch({type: types.RM_NOT_PAID_NOTIFICATION})
    }, 4000)
  }
}
