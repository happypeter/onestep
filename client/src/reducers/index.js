import { combineReducers } from 'redux'

const isOpen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_IT':
      return true
    default:
      return state
  }
}

export default combineReducers({
  isOpen,
})
