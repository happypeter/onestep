const initialState = {
  showLogoutNotification: false,
  showLoginNotification: false,
  showSignupNotification: false,
  showUnhandledErrNotification: false,
  showInvalidTokenNotification: false,
  showResetPasswordNotification: false,
  showNotPaidNotification: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SHOW_LOGIN_NOTIFICATION':
      return {
        ...state,
        showLoginNotification: true,
      }
    case 'SHOW_SIGNUP_NOTIFICATION':
      return {
        ...state,
        showSignupNotification: true,
      }
    case 'SHOW_LOGOUT_NOTIFICATION':
      return {
        ...state,
        showLogoutNotification: true,
      }
    case 'SHOW_INVALID_TOKEN_NOTIFICATION':
      return {
        ...state,
        showInvalidTokenNotification: true,
      }
    case 'SHOW_RESET_PASSWORD_NOTIFICATION':
      return {
        ...state,
        showResetPasswordNotification: true,
      }
    case 'RM_LOGOUT_NOTIFICATION':
      return {
        ...state,
        showLogoutNotification: false,
      }
    case 'RM_LOGIN_NOTIFICATION':
      return {
        ...state,
        showLoginNotification: false,
      }
    case 'RM_SIGNUP_NOTIFICATION':
      return {
        ...state,
        showSignupNotification: false,
      }
    case 'RM_INVALID_TOKEN_NOTIFICATION':
      return {
        ...state,
        showInvalidTokenNotification: false,
      }
    case 'RM_RESET_PASSWORD_NOTIFICATION':
      return {
        ...state,
        showResetPasswordNotification: false,
      }
    case 'SHOW_NOT_PAID_NOTIFICATION':
      return {
        ...state,
        showNotPaidNotification: true,
      }
    case 'RM_NOT_PAID_NOTIFICATION':
      return {
        ...state,
        showNotPaidNotification: false,
      }
    case 'SHOW_UNHANDLED_ERR_NOTIFICATION':
      return {
        ...state,
        showUnhandledErrNotification: true,
      }
    case 'RM_UNHANDLED_ERR_NOTIFICATION':
      return {
        ...state,
        showUnhandledErrNotification: false,
      }
    default:
      return state
  }
}
