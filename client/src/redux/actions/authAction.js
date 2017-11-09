import axios from 'axios'
import {
  showLoginNotification,
  showLogoutNotification,
  showSignupNotification,
  showInvalidTokenNotification } from './notificationAction'

function setCurrentUserInfo (data) {
  return {
    type: 'AUTH_USER',
    userInfo: data
  }
}

function handleError (error, dispatch) {
  if (error.response) {
    switch (error.response.data.errorMsg) {
      case 'USER_DOESNOT_EXIST':
        dispatch({ type: 'USER_DOESNOT_EXIST' })
        break

      case 'INVALID_PASSWORD':
        dispatch({ type: 'INVALID_PASSWORD' })
        break

      case 'USERMANE_ALREADY_EXISTS':
        dispatch({ type: 'USERMANE_ALREADY_EXISTS' })
        break

      case 'MAILBOX_ALREADY_EXISTS':
        dispatch({ type: 'MAILBOX_ALREADY_EXISTS' })
        break

      case 'INVALID_TOKEN':
      case 'EXPIRED_TOKEN':
      case 'TOKEN_NOT_FOUND':
        dispatch({
          type: 'TOKEN_IS_INVALID',
          error
        })
        showInvalidTokenNotification(dispatch)
        break

      default: console.log(error.response.data)
    }
  } else {
    dispatch({ type: 'UNHANDLED_ERROR' })
    setTimeout(function () {
      dispatch({ type: 'RM_UNHANDLED_ERR_NOTIFICATION' })
    }, 4000)
    console.log(error)
  }
}

export function login (data) {
  return dispatch => {
    axios.post('http://localhost:3001/login', data)
         .then(
           res => {
             const token = res.data.token
             const user = res.data.user
             window.sessionStorage.setItem('jwtToken', token)
             window.sessionStorage.setItem('user', user.username)

             dispatch(setCurrentUserInfo(user))
             showLoginNotification(dispatch)
           }
         )
         .catch(
           error => {
             handleError(error, dispatch)
           }
         )
  }
}

export function signup (data) {
  return dispatch => {
    axios.post('http://localhost:3001/signup', data)
         .then(
           res => {
             const token = res.data.token
             const user = res.data.user
             window.sessionStorage.setItem('jwtToken', token)
             window.sessionStorage.setItem('user', user.username)
             dispatch({
               type: 'SIGN_UP',
               userInfo: user
             })

             showSignupNotification(dispatch)
           }
         )
         .catch(
           error => {
             handleError(error, dispatch)
           }
         )
  }
}

export function logout (data) {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' })
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('jwtToken')

    showLogoutNotification(dispatch)
  }
}

export function fakeWechatLogin (user) {
  return dispatch => {
    dispatch({
      type: 'FAKE_WECHATCODE_LOGIN',
      userInfo: user
    })
    showLoginNotification(dispatch)
    window.sessionStorage.setItem('user', 'wechatCode')
  }
}

export const checkToken = (token) => {
  return dispatch => {
    axios.post('http://localhost:3001/auth', {token: token})
         .then(
           res => {
             if (res.data.success !== true) {
               throw new Error('Fail to check token: ' + res)
             } else {
               dispatch({
                 type: 'TOKEN_IS_VALID',
                 success: true
               })
             }
           }
         )
         .catch(
           error => {
             handleError(error, dispatch)
           }
         )
  }
}
