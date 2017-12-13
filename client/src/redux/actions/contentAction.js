import axios from 'axios'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/contentActionTypes.js'

export const fetchStarted = () => ({
  type: types.FETCH_STARTED
})

export const fetchSuccess = (res) => ({
  type: types.FETCH_SUCCESS,
  res
})

export const fetchFailed = (error) => ({
  type: types.FETCH_FAILURE,
  error
})

export function fetchCatalogue (data) {
  return dispatch => {
    dispatch(fetchStarted())

    axios.get(`${config.api}/catalogue`)
   .then(
     res => {
       dispatch(fetchSuccess(res.data))
     }
   )
   .catch(
     error => {
       dispatch(fetchFailed(error))
     }
   )
  }
}

export function fetchCourse (data) {
  return dispatch => {
    dispatch(fetchStarted())

    axios.post(`${config.api}/course`, data)
         .then(
           res => {
             dispatch(fetchSuccess(res.data))
           }
         )
         .catch(
           error => {
             if (error.response && error.response.status === 404) {
               console.log('404');
             }
             dispatch(fetchFailed(error))
           }
         )
  }
}

export function fetchEpisode (data) {
  return dispatch => {
    dispatch(fetchStarted())

    axios.post(`${config.api + '/episode'}`, data)
         .then(
           res => {
             dispatch(fetchSuccess(res.data))
           }
         )
         .catch(
           error => {
             if (error.response && error.response.status === 404) {
               console.log('404');
             }
             dispatch(fetchFailed(error))
           }
         )
  }
}
