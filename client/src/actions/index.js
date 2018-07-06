import { getIsAuthenticated } from '../selectors'
import * as types from '../constants/ActionTypes'
import history from '../utils/routerUtils'

export const goto = path => dispatch => {
  history.push(path)
  dispatch({ type: types.GOTO, path })
}

export const checkAuth = () => (dispatch, getState) => {
  const isAuthenticated = getIsAuthenticated(getState())
  if (!isAuthenticated) {
    history.push('/')
    dispatch({ type: types.ALERT })
  }
}
