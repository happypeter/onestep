import isEmpty from 'lodash.isempty'
import * as types from '../../constants/actionTypes/authActionTypes'
import jwtDecode from 'jwt-decode'

let initialState = {}
if (typeof window !== 'undefined') {
  initialState = {
    isAuthenticated: sessionStorage.jwtToken ? true : false,
    currentUser: sessionStorage.jwtToken
      ? jwtDecode(sessionStorage.jwtToken)
      : {}
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        currentUser: action.user
      }
    case types.UPDATE_USER_COIN:
      return {
        ...state,
        currentUser: { ...state.currentUser, coin: action.coin }
      }
    default:
      return state
  }
}
