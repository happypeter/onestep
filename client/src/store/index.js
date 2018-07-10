import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [thunk]

if (process.env.REACT_STATIC_ENV !== 'production') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export default createStore(rootReducer, applyMiddleware(...middlewares))
