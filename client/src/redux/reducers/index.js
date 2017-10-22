import courses from './courses'
import fakeAuth from './fakeAuth'
import signUp from './signUp'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth,
  signUp
})

export default rootReducer
