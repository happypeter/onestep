const SHOW_USER_COUNT = 'SHOW_USER_COUNT'

function users(state = { count: 0 }, action) {
  switch (action.type) {
    case SHOW_USER_COUNT:
      return Object.assign({}, state, { count: action.payload })
    default:
      return state
  }
}

export default users
