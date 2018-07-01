import { history } from '../../utils/routerUtils'
import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../../constants/actionTypes/notificationActionTypes.js'

export const goto = path => dispatch => {
  history.push(path)
  dispatch({ type: 'GOTO', path })
}

// for authAction
export function showNotification(text) {
  return { type: SHOW_NOTIFICATION, text }
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION }
}
