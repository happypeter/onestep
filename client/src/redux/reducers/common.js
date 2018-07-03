import { combineReducers } from 'redux'
import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../../constants/actionTypes/commonActionTypes.js'

const notification = (state = '', action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.text
    case CLEAR_NOTIFICATION:
      return ''
    default:
      return state
  }
}

const isSidebarOpen = (state = false, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return true
    case CLOSE_SIDEBAR:
      return false
    default:
      return state
  }
}

export default combineReducers({
  notification,
  isSidebarOpen
})
