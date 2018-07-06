import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const isDrawerOpen = (state = false, action) => {
  switch (action.type) {
    case types.OPEN_DRAWER:
      return true
    case types.CLOSE_DRAWER:
      return false
    case types.LEAVE_ON_EPISODE_PAGE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  isDrawerOpen,
})
