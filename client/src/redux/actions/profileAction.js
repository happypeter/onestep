import axios from 'axios'

function setUsername (data) {
  return {
    username: data
  }
}

export const fetchProfileStarted = () => ({
  type: 'FETCH_STARTED'
})

export const fetchProfileSuccess = (res) => ({
  type: 'FETCH_SUCCESS',
  res
})

export const fetchProfileFailed = (error) => ({
  type: 'FETCH_FAILURE',
  error
})

export function fetchProfile (data) {
  return dispatch => {
    dispatch(fetchProfileStarted())

    axios.post('http://localhost:3001/profile', setUsername(data))
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
