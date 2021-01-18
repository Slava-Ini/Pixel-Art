import {
    DRAW_PICTURE,
    CHANGE_TOOL,
    CHANGE_COLOR,
    UNDO_PICTURE,
    REFRESH_DONE,
    CHANGE_SIZE,
    CHANGE_SCALE,
    CLEAR_CANVAS
} from '../actions/actionTypes'

const initialState = {
    width: 32,
    height: 32,
    color: '#000000',
    pixels: [],
    display: [],
    scale: 10,
    isUpdating: true,
    tools: ['draw', 'rectangle', 'fill', 'pick', 'circle', 'line', 'lighten', 'darken'],
    currentTool: 'draw',
    done: [],
    doneAt: 0
}

const canvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAW_PICTURE:
            return {
                ...state,
                pixels: action.payload
            }
        case CHANGE_TOOL:
            return {
                ...state,
                currentTool: action.payload
            }
        case CHANGE_COLOR:
            return {
                ...state,
                color: action.color
            }
        case UNDO_PICTURE:
            return {
                ...state,
                pixels: action.pixels,
                done: action.done,
                doneAt: action.doneAt
            }
        case REFRESH_DONE:
            return {
                ...state,
                done: action.done,
                doneAt: action.doneAt
            }
        case CHANGE_SIZE:
            return {
                ...state,
                width: action.width,
                height: action.height
            }
        case CHANGE_SCALE:
            return {
                ...state,
                scale: action.scale
            }
        case CLEAR_CANVAS:
            return {
                ...state,
                pixels: action.payload
            }
        default:
            return state
    }
}

export default canvasReducer