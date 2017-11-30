import axios from 'axios'
import config from '../../config/config'

export const fetchStarted = () => ({
  type: 'FETCH_STARTED'
})

export const fetchSuccess = (res) => ({
  type: 'FETCH_SUCCESS',
  res
})

export const fetchFailed = (error) => ({
  type: 'FETCH_FAILURE',
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
