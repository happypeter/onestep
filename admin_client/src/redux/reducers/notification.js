const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

function notification(state = { text: '' }, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return Object.assign({}, state, { text: action.payload })
    case CLEAR_NOTIFICATION:
      return Object.assign({}, state, { text: '' })
    default:
      return state
  }
}

export default notification
