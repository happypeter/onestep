import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../../constants/actionTypes/notificationActionTypes.js'

// for authAction
let timeoutId = null
export function notification(dispatch, text) {
  clearTimeout(timeoutId)
  dispatch({type: SHOW_NOTIFICATION, text})
  timeoutId = setTimeout(function() {
    dispatch({type: REMOVE_NOTIFICATION})
  }, 3000)
}
