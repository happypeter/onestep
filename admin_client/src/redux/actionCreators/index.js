import axios from 'axios'
import config from '../../config/config'

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

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

export function clearNotification() {
  console.log('i action creator')
  return {
    type: CLEAR_NOTIFICATION
  }
}
