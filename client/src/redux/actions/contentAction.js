import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/contentActionTypes.js'
import { showNotification } from './notificationAction'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export function fetchCourseIfNeeded(data) {
  return (dispatch, getState) => {
    console.log('ifneeded', getState())
    if (getState().course.all.length !== 0) return
    dispatch({ type: types.FETCH_COURSES_STARTED })
    axios
      .get(`${config.api}/catalogue`)
      .then(res => {
        dispatch({
          type: types.FETCH_COURSES_SUCCESS,
          courses: res.data.courses
        })
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function fetchCourse(data) {
  return dispatch => {
    dispatch({ type: types.FETCH_COURSE_STARTED })
    axios
      .get(`${config.api}/courses/${data.courseName}`)
      .then(res => {
        dispatch({ type: types.FETCH_COURSE_SUCCESS, course: res.data.course })
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function fetchEpisode(data) {
  return dispatch => {
    dispatch({ type: types.FETCH_EPISODE_STARTED })
    axios
      .get(`${config.api}/episode`, { params: data })
      .then(res => {
        dispatch({
          type: types.FETCH_EPISODE_SUCCESS,
          episode: res.data
        })
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

export function checkContract(contractId, type) {
  return dispatch => {
    return axios
      .get(`${config.api}/contracts/${contractId}/status`, { params: { type } })
      .then(res => {
        if (res.data.status === '已支付') {
          if (type === 'course') {
            dispatch({
              type: 'ADD_PAID_COURSE',
              course: res.data.course
            })
          } else {
            dispatch({
              type: 'ACTIVATE_MEMBERSHIP',
              member: res.data.member
            })
          }
        }

        return Promise.resolve(res.data.status)
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}
