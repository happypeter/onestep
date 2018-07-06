import { combineReducers } from 'redux'
import auth from './auth'
import common from './common'

export default combineReducers({
  common,
  auth,
})
