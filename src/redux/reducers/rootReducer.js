import {combineReducers} from "redux"
import canvasReducer from "./canvasReducer"
import authReducer from './authReducer'

export default combineReducers({
    canvas: canvasReducer,
    authentication: authReducer
})