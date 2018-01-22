import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/profileActionTypes.js'
import {showNotification} from './notificationAction'

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export const fetchProfileStarted = () => ({
  type: types.FETCH_PROFILE_STARTED,
})

export const fetchProfileSuccess = data => ({
  type: types.FETCH_PROFILE_SUCCESS,
  data,
})

export const fetchProfileFailed = error => ({
  type: types.FETCH_PROFILE_FAILURE
})

export const clearProfile = () => ({
  type: types.CLEAR_PROFILE
})

export function fetchProfile() {
  return dispatch => {
    dispatch(fetchProfileStarted())
    axios
      .get(`${config.api + '/profile'}`)
      .then(res => {
        dispatch(fetchProfileSuccess(res.data))
      })
      .catch(error => {
        handleError(error, dispatch)
        dispatch(fetchProfileFailed(error))
      })
  }
}
