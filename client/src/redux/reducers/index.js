import courses from './courses'
import fakeAuth from './fakeAuth'
import form from './form'
import profile from './profile'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth,
  form,
  profile
})

export default rootReducer
