const initialState = {
  isFetching: false,
  details: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_PROFILE_STARTED': {
      return { ...state, isFetching: true }
    }
    case 'FETCH_RIGHTS_SUCCESS': {
      return { ...state, isFetching: false, details: action.data }
    }
    case 'FETCH_PROFILE_FAILURE': {
      return { ...state, isFetching: false }
    }
    case 'ADD_PAID_COURSE': {
      const courses = [...state.details.paidCourses, action.course]
      let sum = courses.reduce((sum, a) => sum + a.total, 0)
      sum = state.details.memberships.reduce((sum, a) => sum + a.total, 0)
      return {
        ...state,
        details: { ...state.details, paidCourses: courses, sum }
      }
    }
    case 'ACTIVATE_MEMBERSHIP': {
      const memberships = [...state.details.memberships, action.member]
      let sum = state.details.paidCourses.reduce((sum, a) => sum + a.total, 0)
      sum = memberships.reduce((sum, a) => sum + a.total, 0)
      return {
        ...state,
        details: {
          ...state.details,
          memberships: memberships,
          sum,
          isMember: true
        }
      }
    }
    case 'CLEAR_PROFILE': {
      return initialState
    }
    default:
      return state
  }
}
