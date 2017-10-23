export function setCurrentUserInfo (data) {
  return {
    type: 'AUTH_USER',
    userInfo: data
  }
}

export function login (data) {
  return dispatch => {
    // axios ...
    dispatch(setCurrentUserInfo(data))
    window.localStorage.setItem('userInfo', data.username)
  }
}

export function logout (data) {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' })
    window.localStorage.removeItem('userInfo')
  }
}
