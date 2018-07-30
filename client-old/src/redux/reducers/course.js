const initialState = {
  isFetching: false,
  all: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_COURSES_STARTED': {
      return { isFetching: true }
    }
    case 'FETCH_COURSES_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        all: action.courses
      }
    }
    default:
      return state
  }
}
