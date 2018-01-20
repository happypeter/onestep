import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/contentActionTypes.js'
import {showNotification} from './notificationAction'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export function fetchCourses(data) {
  return dispatch => {
    dispatch({type: types.FETCH_COURSES_STARTED})
    axios
      .get(`${config.api}/catalogue`)
      .then(res => {
        dispatch({type: types.FETCH_COURSES_SUCCESS, courses: res.data.courses})
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function fetchCourse(data) {
  return dispatch => {
    dispatch({type: types.FETCH_COURSE_STARTED})
    axios
      .get(`${config.api}/courses/${data.courseName}`)
      .then(res => {
        dispatch({type: types.FETCH_COURSE_SUCCESS, course: res.data.course})
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function fetchEpisode(data) {
  return dispatch => {
    dispatch({type: types.FETCH_EPISODE_STARTED})
    axios
      .post(`${config.api + '/episode'}`, data)
      .then(res => {
        dispatch({type: types.FETCH_EPISODE_SUCCESS, episode: res.data.episode})
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function signContract(data) {
  return dispatch => {
    return axios
      .post(`${config.api}/contracts/new`, data)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function checkContract(contractId) {
  return dispatch => {
    return axios
      .get(`${config.api}/contracts/${contractId}/status`)
      .then(res => {
        return Promise.resolve(res.data.status)
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}
