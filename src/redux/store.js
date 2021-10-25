import {createStore, combineReducers, applyMiddleware} from 'redux'
import TwitchKey from './reducers/TwitchKey'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    TwitchKey
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;