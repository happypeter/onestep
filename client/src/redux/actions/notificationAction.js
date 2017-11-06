export function removeLogoutNotification (data) {
  return dispatch => {
    dispatch({ type: 'RM_LOGOUT_NOTIFICATION' })
  }
}

export function removeLoginNotification (data) {
  return dispatch => {
    dispatch({ type: 'RM_LOGIN_NOTIFICATION' })
  }
}

export function removeSignupNotification (data) {
  return dispatch => {
    dispatch({ type: 'RM_SIGNUP_NOTIFICATION' })
  }
}
