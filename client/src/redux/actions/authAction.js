import axios from 'axios'
import {
  showLoginNotification,
  showLogoutNotification,
  showSignupNotification,
  showInvalidTokenNotification,
  showResetPasswordNotification,
  showUnhandledErrNotification
} from './notificationAction'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/authActionTypes.js'

function setCurrentUserInfo (data) {
  return {
    type: types.AUTH_USER,
    userInfo: data
  }
}

function handleError (error, dispatch) {
  if (error.response) {
    switch (error.response.data.errorMsg) {
      case 'USER_DOESNOT_EXIST':
        dispatch({ type: types.USER_DOESNOT_EXIST })
        break

      case 'INVALID_PASSWORD':
        dispatch({ type: types.INVALID_PASSWORD })
        break

      case 'USERMANE_ALREADY_EXISTS':
        dispatch({ type: types.USERMANE_ALREADY_EXISTS })
        break

      case 'PHONE_NUM_DOESNOT_EXIST':
        dispatch({ type: types.PHONE_NUM_DOESNOT_EXIST })
        break

      case 'PHONE_NUM_ALREADY_EXISTS':
        dispatch({ type: types.PHONE_NUM_ALREADY_EXISTS })
        break

      case 'PLEASE_USE_PHONE_NUM':
        dispatch({ type: types.PLEASE_USE_PHONE_NUM })
        break

      case 'INVALID_TOKEN':
      case 'EXPIRED_TOKEN':
      case 'TOKEN_NOT_FOUND':
        dispatch({
          type: types.TOKEN_IS_INVALID,
          error
        })
        showInvalidTokenNotification(dispatch)
        break

      case 'SMS_NO_RECORED':
      case 'SMS_ERR_TRY_AGAIN':
        dispatch({ type: types.SMS_ERR_TRY_AGAIN })
        break

      case 'SMS_CODE_IS_INVALID':
        dispatch({ type: types.SMS_CODE_IS_INVALID })
        break

      case 'EXPIRED_SMS_CODE':
        dispatch({ type: types.EXPIRED_SMS_CODE })
        break

      default:
        showUnhandledErrNotification(dispatch)
        console.log(error.response.data)
    }
  } else {
    showUnhandledErrNotification(dispatch)
    console.log(error)
  }
}

export function login (data) {
  return dispatch => {
    axios.post(`${config.api + '/login'}`, data)
         .then(
           res => {
             const token = res.data.token
             const user = res.data.user
             window.sessionStorage.setItem('jwtToken', token)
             window.sessionStorage.setItem('user', user.phoneNum)

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
    axios.post(`${config.api + '/signup'}`, data)
         .then(
           res => {
             const token = res.data.token
             const user = res.data.user
             window.sessionStorage.setItem('jwtToken', token)
             window.sessionStorage.setItem('user', user.phoneNum)
             dispatch({
               type: types.SIGN_UP,
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
    dispatch({ type: types.LOG_OUT })
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('jwtToken')

    showLogoutNotification(dispatch)
  }
}

export function fakeWechatLogin (user) {
  return dispatch => {
    dispatch({
      type: types.FAKE_WECHATCODE_LOGIN,
      userInfo: user
    })
    showLoginNotification(dispatch)
    window.sessionStorage.setItem('user', 'wechatCode')
  }
}

export const checkToken = (token) => {
  return dispatch => {
    axios.post(`${config.api + '/auth'}`, {token})
         .then(
           res => {
             if (res.data.success !== true) {
               throw new Error('Fail to check token: ' + res)
             } else {
               dispatch({
                 type: types.TOKEN_IS_VALID,
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

// 检测 Episode 权限部分
export function initEpAuthStatus () {
  return dispatch => {
    dispatch({ type: types.EP_STATUS_INIT })
  }
}

function checkMembership (date) {
  let now = new Date()
  let isMember = Date.parse(date) - Date.parse(now)
  return isMember
}

function checkShoplist (shoplist, courseName) {
  let isPaid = shoplist.find(
    course => (
      course.link.substr(1) === courseName
    )
  )
  return !!isPaid
}

export const episodeAuthFetchStarted = () => ({
  type: types.EP_AUTH_FETCH_STARTED
})

export const episodeAuthFetchFailed = () => ({
  type: types.EP_AUTH_FETCH_FAILED
})

export const checkEpisodeAuth = (data) => {
  return dispatch => {
    dispatch(episodeAuthFetchStarted())

    let { phoneNum, courseName } = data
    axios.post(`${config.api + '/profile'}`, {phoneNum})
         .then(
           res => {
             let paidRes = res.data

             if (res.status !== 200) {
               throw new Error('Fail to check paid courses: ' + paidRes)
             } else {
               if (paidRes.admin) {
                 console.log('admin')
                 dispatch({
                   type: types.EPISODE_AUTH_VALID
                 })
                 return
               }
               if (!paidRes.latestExpireDate || !checkMembership(paidRes.latestExpireDate)) {
                 console.log('not a member')
                 // now we need to check if the user bought the course
                 if ((paidRes.paidCourses.length === 0) || !checkShoplist(paidRes.paidCourses, courseName)) {
                   // time to refuse the user
                   console.log('refuse')
                   dispatch({
                     type: types.EPISODE_AUTH_INVALID
                   })
                 } else {
                   console.log('you already bought this course!')
                   dispatch({
                     type: types.EPISODE_AUTH_VALID
                   })
                 }
               } else {
                 console.log('here comes a member')
                 dispatch({
                   type: types.EPISODE_AUTH_VALID
                 })
               }
             }
           }
         ).catch(
           error => {
             dispatch(episodeAuthFetchFailed())
             handleError(error, dispatch)
           }
         )
  }
}

export function resetPassword (data) {
  return dispatch => {
    axios.post(`${config.api + '/resetpassword'}`, data)
         .then(
           res => {
             const token = res.data.token
             const user = res.data.user
             window.sessionStorage.setItem('jwtToken', token)
             dispatch({
               type: types.RESET_PASSWORD,
               userInfo: user
             })
             showResetPasswordNotification(dispatch)
           }
         )
         .catch(
           error => {
             handleError(error, dispatch)
           }
         )
  }
}
