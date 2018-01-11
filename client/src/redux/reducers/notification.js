export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {...state, text: action.text}
    case 'CLEAR_NOTIFICATION':
      return {}
    default:
      return state
  }
}
