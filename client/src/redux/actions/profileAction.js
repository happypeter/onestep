import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/profileActionTypes.js'

export const fetchProfileStarted = () => ({
  type: types.FETCH_STARTED,
})

export const fetchProfileSuccess = res => ({
  type: types.FETCH_SUCCESS,
  res,
})

export const fetchProfileFailed = error => ({
  type: types.FETCH_FAILURE,
  error,
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
        dispatch(fetchProfileFailed(error))
      })
  }
}
