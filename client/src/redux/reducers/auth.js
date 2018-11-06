import isEmpty from 'lodash.isempty'
import * as types from '../../constants/actionTypes/authActionTypes'
import jwtDecode from 'jwt-decode'

let initialState = {}
if (typeof window !== 'undefined') {
  initialState = {
    isAuthenticated: localStorage.jwtToken ? true : false,
    currentUser: localStorage.jwtToken ? jwtDecode(localStorage.jwtToken) : {}
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
