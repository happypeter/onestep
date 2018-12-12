import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { showNotification } from './index'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/authActionTypes.js'
import history from '../../utils/routerUtils'

export const setCurrentUser = user => ({
  type: types.AUTH_USER,
  user
})

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export function login(data) {
  return dispatch => {
    axios
      .post(`${config.api}/login`, data)
      .then(res => {
        const token = res.data.token
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwtToken', token)
        }
        dispatch(setCurrentUser(jwtDecode(token)))
        dispatch(showNotification('登录成功'))
        history.push('/')
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function signup(data) {
  return dispatch => {
    axios
      .post(`${config.api}/signup`, data)
      .then(res => {
        const token = res.data.token
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwtToken', token)
        }
        dispatch(setCurrentUser(jwtDecode(token)))
        dispatch(showNotification('注册成功'))
        history.push('/')
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function logOut() {
  return dispatch => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwtToken')
    }
    dispatch(setCurrentUser({}))
    history.push('/')
    dispatch(showNotification('退出成功'))
  }
}

export function getProfile() {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .get(`${config.api}/profile`, {
          headers: { Authorization: localStorage.jwtToken }
        })
        .then(res => {
          if (res.data && res.data.success === true) {
            dispatch({ type: types.UPDATE_USER_INFO, user: res.data.user })
          }
        })
        .catch(error => {
          handleError(error, dispatch)
        })
    }
  }
}
