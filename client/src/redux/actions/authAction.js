import axios from 'axios'
import {
  showLoginNotification,
  showLogoutNotification,
  showSignupNotification,
  showInvalidTokenNotification,
  showResetPasswordNotification,
  showNotPaidNotification
} from './notificationAction'
import config from '../../config/config'

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

      case 'PHONE_NUM_DOESNOT_EXIST':
        dispatch({ type: 'PHONE_NUM_DOESNOT_EXIST' })
        break

      case 'PHONE_NUM_ALREADY_EXISTS':
        dispatch({ type: 'PHONE_NUM_ALREADY_EXISTS' })
        break

      case 'PLEASE_USE_PHONE_NUM':
        dispatch({ type: 'PLEASE_USE_PHONE_NUM' })
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

      case 'SMS_NO_RECORED':
      case 'SMS_ERR_TRY_AGAIN':
        dispatch({ type: 'SMS_ERR_TRY_AGAIN' })
        break

      case 'SMS_CODE_IS_INVALID':
        dispatch({ type: 'SMS_CODE_IS_INVALID' })
        break

      case 'EXPIRED_SMS_CODE':
        dispatch({ type: 'EXPIRED_SMS_CODE' })
        break

      default:
        dispatch({ type: 'UNHANDLED_ERROR' })
        setTimeout(function () {
          dispatch({ type: 'RM_UNHANDLED_ERR_NOTIFICATION' })
        }, 4000)
        console.log(error.response.data)
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
    axios.post(`${config.api + '/auth'}`, {token})
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

export const checkEpisodeAuth = (data) => {
  let { token, phoneNum, courseName } = data
  return dispatch => {
    Promise.all([
      axios.post(`${config.api + '/auth'}`, {token}),
      axios.post(`${config.api + '/profile'}`, {phoneNum})
    ]).then(
      res => {
        let tokenRes = res[0].data
        if (tokenRes.success !== true) {
          throw new Error('Fail to check token: ' + res[0])
        } else {
          dispatch({
            type: 'TOKEN_IS_VALID',
            success: true
          })
        }

        let paidRes = res[1].data
        if (res[1].status !== 200) {
          throw new Error('Fail to check paid courses: ' + paidRes)
        } else {
          if (!paidRes.latestExpireDate || !checkMembership(paidRes.latestExpireDate)) {
            console.log('not a member')
            // now we need to check if the user bought the course
            if ((paidRes.paidCourses.length === 0) || !checkShoplist(paidRes.paidCourses, courseName)) {
              // time to refuse the user
              console.log('refuse')
              dispatch({
                type: 'EPISODE_AUTH_INVALID'
              })
              // show notification
              showNotPaidNotification(dispatch)
            } else {
              console.log('you already bought this course!')
              dispatch({
                type: 'EPISODE_AUTH_VALID'
              })
            }
          } else {
            console.log('here comes a member')
            dispatch({
              type: 'EPISODE_AUTH_VALID'
            })
          }
        }
      }
    ).catch(
      error => {
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
               type: 'RESET_PASSWORD',
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
