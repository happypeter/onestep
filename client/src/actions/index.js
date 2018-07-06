import { getIsAuthenticated, getIsDrawerOpen } from '../selectors'
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

export const toggleDrawer = () => (dispatch, getState) => {
  const isDrawerOpen = getIsDrawerOpen(getState())
  if (!isDrawerOpen) {
    dispatch({ type: types.OPEN_DRAWER })
  } else {
    dispatch({ type: types.CLOSE_DRAWER })
  }
}
