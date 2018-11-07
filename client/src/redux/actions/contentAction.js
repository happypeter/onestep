import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/contentActionTypes.js'
import { showNotification } from './index'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export function fetchEpisode(data) {
  return dispatch => {
    dispatch({ type: types.FETCH_EPISODE_STARTED })

    if (typeof window !== 'undefined') {
      axios
        .get(`${config.api}/episode`, {
          params: data,
          headers: { Authorization: localStorage.jwtToken }
        })
        .then(res => {
          if (res.data && res.data.success === true) {
            dispatch({
              type: types.FETCH_EPISODE_SUCCESS,
              doc: res.data.doc
            })
          }
        })
        .catch(error => {
          handleError(error, dispatch)
        })
    }
  }
}

export function open(data) {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .post(`${config.api}/open`, data, {
          headers: { Authorization: localStorage.jwtToken }
        })
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

export function openCourse(data) {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .post(`${config.api}/open`, data, {
          headers: { Authorization: localStorage.jwtToken }
        })
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

export function openVip(data) {
  return dispatch => {
    if (typeof window !== 'undefined') {
      axios
        .post(`${config.api}/vip`, data, {
          headers: { Authorization: localStorage.jwtToken }
        })
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
