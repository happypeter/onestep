export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {...state, text: action.text}
    case 'REMOVE_NOTIFICATION':
      return {}
    default:
      return state
  }
}
