import * as types from '../../constants/actionTypes/authActionTypes'

const initialState = {
  isAuthenticated: sessionStorage.jwtToken,
  currentUser: {}
}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        isAuthenticated: Object.keys(action.user).length !== 0,
        currentUser: action.user
      }
    default:
      return state
  }
}
