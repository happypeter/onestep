const initialState = {
  isFetching: false,
  item: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_COURSE_STARTED': {
      return {...state, isFetching: true}
    }
    case 'FETCH_COURSE_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        item: action.course,
      }
    }
    default:
      return state
  }
}
