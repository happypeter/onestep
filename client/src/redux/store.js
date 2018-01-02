// import { createStore } from 'redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/'

// const store = createStore(rootReducer)
const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

export default store
