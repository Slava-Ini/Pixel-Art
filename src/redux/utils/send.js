import {store} from "../../index"
import {DRAW_PICTURE} from "../actions/actionTypes"

// Dispatches pixels array
// if given mutate: true gives out the pixels ready for dispatch
// serves the purpose of the immutable change (for displaying lines, squares, circles
// without changing the actual state)
export const send = (pixels, mutate = false) => {
    if (!pixels) return
    const state = store.getState().canvas
    let copy = state.pixels.slice()
    for (let {x, y, color} of pixels) {
        copy[x + y * state.width] = color
    }

    if (mutate) return copy
    return store.dispatch({
        type: DRAW_PICTURE,
        payload: copy
    })
}