import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/profileActionTypes.js'

function setUsername (data) {
  return {
    phoneNum: data
  }
}

export const fetchProfileStarted = () => ({
  type: types.FETCH_STARTED
})

export const fetchProfileSuccess = (res) => ({
  type: types.FETCH_SUCCESS,
  res
})

export const fetchProfileFailed = (error) => ({
  type: types.FETCH_FAILURE,
  error
})

export function fetchProfile (data) {
  return dispatch => {
    dispatch(fetchProfileStarted())

    axios.post(`${config.api + '/profile'}`, setUsername(data))
   .then(
     res => {
       dispatch(fetchProfileSuccess(res.data))
     }
   )
   .catch(
     error => {
       dispatch(fetchProfileFailed(error))
     }
   )
  }
}
