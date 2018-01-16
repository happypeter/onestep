import courses from './courses'
import fakeAuth from './fakeAuth'
import auth from './auth'
import profile from './profile'
import notification from './notification'
import {combineReducers} from 'redux'
import course from './course'
import episode from './episode'
import smsSend from './smsSend'
import weChatUser from './weChatUser'

const rootReducer = combineReducers({
  course,
  courses,
  fakeAuth,
  auth,
  profile,
  notification,
  episode,
  smsSend,
  weChatUser,
})

export default rootReducer
