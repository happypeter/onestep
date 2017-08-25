import courses from './courses'
import fakeAuth from './fakeAuth'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth
})

export default rootReducer
