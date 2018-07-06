import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [thunk]
if (process.env !== 'production') {
  middlewares.push(logger)
}

export default createStore(rootReducer, applyMiddleware(...middlewares))
