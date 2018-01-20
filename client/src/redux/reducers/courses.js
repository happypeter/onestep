const initialState = {
  isFetching: false,
  items: [],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_COURSES_STARTED': {
      return {isFetching: true}
    }
    case 'FETCH_COURSES_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        items: action.courses,
      }
    }
    default:
      return state
  }
}
