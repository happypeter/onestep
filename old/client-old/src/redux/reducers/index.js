import auth from './auth'
import profile from './profile'
import common from './common'
import { combineReducers } from 'redux'
import currentCourse from './currentCourse'
import course from './course'
import episode from './episode'
import smsSend from './smsSend'
import weChatUser from './weChatUser'

const rootReducer = combineReducers({
  currentCourse,
  course,
  auth,
  profile,
  common,
  episode,
  smsSend,
  weChatUser
})

export default rootReducer
