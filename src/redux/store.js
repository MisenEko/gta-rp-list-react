import {createStore, combineReducers, applyMiddleware} from 'redux'
import TwitchKey from './reducers/TwitchKey'
import TwitchData from './reducers/TwitchData'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    TwitchKey,
    TwitchData,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;