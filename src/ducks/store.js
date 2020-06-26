
import {createStore, combineReducers,applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import mainReducer from './reducer'
const rootReducer = combineReducers({
    mainReducer: mainReducer,
})

export default createStore(rootReducer, applyMiddleware(promise));