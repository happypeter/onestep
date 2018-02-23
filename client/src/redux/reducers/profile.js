const initialState = {
  isFetching: false,
  details: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_PROFILE_STARTED': {
      return { ...state, isFetching: true }
    }
    case 'FETCH_PROFILE_SUCCESS': {
      return { ...state, isFetching: false, details: action.data }
    }
    case 'FETCH_PROFILE_FAILURE': {
      return { ...state, isFetching: false }
    }
    case 'ADD_PAID_COURSE': {
      const courses = [...state.details.paidCourses, action.course]
      const sum = courses.reduce((sum, a) => sum + a.total, 0)
      return {
        ...state,
        details: { ...state.details, paidCourses: courses, sum }
      }
    }
    case 'CLEAR_PROFILE': {
      return initialState
    }
    default:
      return state
  }
}
