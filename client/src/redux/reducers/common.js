import { combineReducers } from 'redux'
import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION
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

export default combineReducers({
  notification
})
