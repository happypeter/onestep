// for authAction
export function showLoginNotification (dispatch) {
  dispatch({ type: 'SHOW_LOGIN_NOTIFICATION' })
  setTimeout(function () {
    dispatch({ type: 'RM_LOGIN_NOTIFICATION' })
  }
  , 4000)
}

export function showSignupNotification (dispatch) {
  dispatch({ type: 'SHOW_SIGNUP_NOTIFICATION' })
  setTimeout(function () {
    dispatch({ type: 'RM_SIGNUP_NOTIFICATION' })
  }
  , 4000)
}

export function showLogoutNotification (dispatch) {
  dispatch({ type: 'SHOW_LOGOUT_NOTIFICATION' })
  setTimeout(function () {
    dispatch({ type: 'RM_LOGOUT_NOTIFICATION' })
  }
  , 4000)
}

export function showInvalidTokenNotification (dispatch) {
  dispatch({ type: 'SHOW_INVALID_TOKEN_NOTIFICATION' })
  setTimeout(() => {
    dispatch({ type: 'RM_INVALID_TOKEN_NOTIFICATION' })
  }, 4000)
}

// for react components
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

export function removeUnhandledErrNotification () {
  return dispatch => {
    dispatch({ type: 'RM_UNHANDLED_ERR_NOTIFICATION' })
  }
}

export function removeInvalidTokenNotification () {
  return dispatch => {
    dispatch({ type: 'RM_INVALID_TOKEN_NOTIFICATION' })
  }
}
