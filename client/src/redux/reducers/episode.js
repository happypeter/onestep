const initialState = {
  isFetching: false,
  doc: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EPISODE_STARTED': {
      return { ...state, isFetching: true }
    }
    case 'FETCH_EPISODE_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        doc: action.doc
      }
    }
    default:
      return state
  }
}
