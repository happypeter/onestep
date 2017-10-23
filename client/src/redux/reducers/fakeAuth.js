import isEmpty from 'lodash/fp/isEmpty'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  showLogoutNotification: false,
  showLoginNotification: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo,
        showLoginNotification: true
      }
    case 'LOG_OUT':
      return {
        isAuthenticated: false,
        currentUser: {},
        showLogoutNotification: true
      }
    case 'RM_LOGOUT_NOTIFICATION':
      return {
        ...state,
        showLogoutNotification: false
      }
    case 'RM_LOGIN_NOTIFICATION':
      return {
        ...state,
        showLoginNotification: false
      }
    default:
      return state
  }
}
