import { combineReducers } from 'redux'
import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SET_ON_EPISODE_PAGE,
  CLEAR_ON_EPISODE_PAGE
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

const isSidebarOpen = (state = true, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return true
    case CLOSE_SIDEBAR:
      return false
    default:
      return state
  }
}

const isOnEpisodePage = (state = false, action) => {
  switch (action.type) {
    case SET_ON_EPISODE_PAGE:
      return true
    case CLEAR_ON_EPISODE_PAGE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  notification,
  isSidebarOpen,
  isOnEpisodePage
})
