import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import showMsgReducer from './showMsgReducer'

export default combineReducers({
    progress : loadingReducer,
    showmsg : showMsgReducer
})