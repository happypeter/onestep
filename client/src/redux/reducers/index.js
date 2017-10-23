import courses from './courses'
import fakeAuth from './fakeAuth'
import signupForm from './signupForm'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth,
  signupForm
})

export default rootReducer
