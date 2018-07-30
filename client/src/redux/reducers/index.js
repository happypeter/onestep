import auth from './auth'
import common from './common'
import { combineReducers } from 'redux'
import episode from './episode'
import smsSend from './smsSend'

const rootReducer = combineReducers({
  auth,
  common,
  episode,
  smsSend
})

export default rootReducer
