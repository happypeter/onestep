import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/'

let store
if (process.env.REACT_STATIC_ENV !== 'production') {
  const { logger } = require('redux-logger')
  store = createStore(rootReducer, applyMiddleware(thunk, logger))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
