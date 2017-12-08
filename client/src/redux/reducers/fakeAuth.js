import isEmpty from 'lodash/fp/isEmpty'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  epAuthStatus: 'LOADING',
  isEpisodePaid: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'EP_AUTH_FETCH_STARTED': {
      return {
        ...state,
        epAuthStatus: 'LOADING',
        isEpisodePaid: false
      }
    }
    case 'AUTH_USER':
      return {
        // ...state,
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo
      }
    case 'SIGN_UP':
      return {
        // ...state,
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo
      }
    case 'RESET_PASSWORD':
      return {
        // ...state,
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo
      }
    case 'LOG_OUT':
      return {
        // ...state,
        isAuthenticated: false,
        currentUser: {}
      }
    case 'FAKE_WECHATCODE_LOGIN':
      return {
        // ...state,
        isAuthenticated: !isEmpty(action.userInfo),
        currentUser: action.userInfo
      }
    case 'TOKEN_IS_VALID':
      return {
        ...state,
        isAuthenticated: action.success
      }
    case 'TOKEN_IS_INVALID':
      return {
        // ...state,
        isAuthenticated: false
      }
    case 'EPISODE_AUTH_VALID':
      return {
        ...state,
        epAuthStatus: 'SUCCESS',
        isEpisodePaid: true
      }
    case 'EPISODE_AUTH_INVALID':
      return {
        ...state,
        epAuthStatus: 'SUCCESS',
        isEpisodePaid: false
      }
    case 'EP_AUTH_FETCH_FAILED':
      return {
        ...state,
        epAuthStatus: 'FAILURE'
      }
    default:
      return state
  }
}
