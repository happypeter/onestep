import history from '../../utils/routerUtils'
import {
  SHOW_NOTIFICATION,
  CLEAR_NOTIFICATION,
  GOTO
} from '../../constants/actionTypes/commonActionTypes.js'
import {
  getIsDrawerOpen,
  getIsAuthenticated
} from '../selectors/commonSelectors'

export const goto = path => dispatch => {
  history.push(path)
  dispatch({ type: GOTO, path })
}

// for authAction
export function showNotification(text) {
  return { type: SHOW_NOTIFICATION, text }
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION }
}
