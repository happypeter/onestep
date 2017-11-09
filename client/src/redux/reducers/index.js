import courses from './courses'
import fakeAuth from './fakeAuth'
import form from './form'
import profile from './profile'
import notification from './notification'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  courses,
  fakeAuth,
  form,
  profile,
  notification
})

export default rootReducer
