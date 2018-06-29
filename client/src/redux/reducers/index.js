import auth from './auth'
import profile from './profile'
import notification from './notification'
import { combineReducers } from 'redux'
import currentCourse from './currentCourse'
import courses from './courses'
import episode from './episode'
import smsSend from './smsSend'
import weChatUser from './weChatUser'

const rootReducer = combineReducers({
  currentCourse,
  courses,
  auth,
  profile,
  notification,
  episode,
  smsSend,
  weChatUser
})

export default rootReducer
