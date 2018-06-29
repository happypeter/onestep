import { combineReducers } from 'redux'
import * as types from '../../constants/actionTypes/contentActionTypes'

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_STARTED:
      return true
    case types.FETCH_COURSE_SUCCESS:
      return false
    default:
      return state
  }
}

const info = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_SUCCESS:
      return action.course
    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  info
})
