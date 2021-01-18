import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    CHANGE_USERNAME
} from '../actions/actionTypes'

const initialState = {
    token: null,
    userName: null,
    email: null,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userName: action.userName,
                email: action.email,
                userId: action.userId
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null, userName: null, email: null, userId: null
            }
        case CHANGE_USERNAME:
            return {
                ...state, userName: action.userName
            }

        default: return state
    }
}

export default authReducer