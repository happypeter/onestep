const initialState = {
  isFetching: false,
  item: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_EPISODE_STARTED': {
      return {...state, isFetching: true}
    }
    case 'FETCH_EPISODE_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        item: action.episode
      }
    }
    default:
      return state
  }
}
