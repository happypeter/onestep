import { combineReducers } from 'redux'
import notification from './notification'
import users from './users'

const rootReducer = combineReducers({ notification, users })

export default rootReducer
