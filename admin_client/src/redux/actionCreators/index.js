import axios from 'axios'
import config from '../../config/config'

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
const SHOW_USER_COUNT = 'SHOW_USER_COUNT'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

function showNotification(text) {
  return {
    type: SHOW_NOTIFICATION,
    payload: text
  }
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION
  }
}

export function openCourse(data) {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .post(`${config.api}/${config.adminRouter}/open`, data)
        .then(res => {
          if (res.data && res.data.success === true) {
            dispatch(showNotification('课程权限已开通'))
          }
        })
        .catch(error => {
          handleError(error, dispatch)
        })
    }
  }
}

function showUserCount(count) {
  return {
    type: SHOW_USER_COUNT,
    payload: count
  }
}

export function getUsers() {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .get(`${config.api}/${config.adminRouter}/users`)
        .then(res => {
          if (res.data && res.data.success === true) {
            dispatch(showUserCount(res.data.count))
          }
        })
        .catch(error => {
          handleError(error, dispatch)
        })
    }
  }
}
