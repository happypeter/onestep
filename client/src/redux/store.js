import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/'
import logger from 'redux-logger'

let store
if (process.env.NODE_ENV !== 'production') {
  store = createStore(rootReducer, applyMiddleware(thunk, logger))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
