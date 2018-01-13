import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '../../constants/actionTypes/notificationActionTypes.js'

// for authAction
export function showNotification(text) {
  return {type: SHOW_NOTIFICATION, text}
}

export function clearNotification() {
  return {type: CLEAR_NOTIFICATION}
}
