import courses from './courses'
import fakeAuth from './fakeAuth'
import form from './form'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth,
  form
})

export default rootReducer
