import {createStore, combineReducers, applyMiddleware} from 'redux'
import TwitchKey from './reducers/TwitchKey'
import TwitchData from './reducers/TwitchData'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const rootReducer = combineReducers({
    TwitchKey,
    TwitchData,
})

const getKey = store => next => action => {
    console.log(action)
}

const store = createStore(
    rootReducer,
    applyMiddleware(
            thunk,    
            promise
          ))


export default store;