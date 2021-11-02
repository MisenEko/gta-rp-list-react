import {createStore, combineReducers, applyMiddleware} from 'redux'
import TwitchKey from './reducers/TwitchKey'
import TwitchData from './reducers/TwitchData'
import TwitchDataRefresh from './reducers/TwitchDataRefresh'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const rootReducer = combineReducers({
    TwitchKey,
    TwitchData,
    TwitchDataRefresh
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk))


export default store;