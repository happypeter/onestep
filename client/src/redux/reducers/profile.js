const initialState = {
  isFetching: false,
  details: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_PROFILE_STARTED': {
      return {...state, isFetching: true}
    }
    case 'FETCH_PROFILE_SUCCESS': {
      return {...state, isFetching: false, details: action.data}
    }
    case 'FETCH_PROFILE_FAILURE': {
      return {...state, isFetching: false}
    }
    case 'CLEAR_PROFILE': {
      return initialState
    }
    default:
      return state
  }
}
