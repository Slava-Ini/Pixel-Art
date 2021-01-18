import {store} from '../../index'
import {drawCanvas} from '../actions/canvasActions'
import {CLEAR_CANVAS, DRAW_PICTURE, REFRESH_DONE, UNDO_PICTURE} from '../actions/actionTypes'
import {pictureFromImage} from './pictureFromImage'

// Used for the 'save' button
// creates and clicks the link to download the
// canvas image
export const save = (width, height, scale) => {
    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    drawCanvas(store.getState().canvas, canvas, scale, false, [], false)
    const link = document.createElement('a')
    link.href = canvas.toDataURL()
    link.download = "pixelart.png"
    document.body.appendChild(link)
    link.click()
    link.remove()
}

// Used for undo button returns the previous canvas state
export const undoPicture = (done) => {
    if (done.length === 0) {
        return
    } else {
        store.dispatch({
            type: UNDO_PICTURE,
            pixels: done[0],
            done: done.slice(1),
            doneAt: 0
        })
    }
}

// Forced refresh in case some of drawing events were not fired
// e.g. some tools only fire 'move' events but not clicks
// so refresh is used to force rerender if it was just a click on one pixel
export const refresh = (done, doneAt, pixels) => {
    if (pixels && doneAt < Date.now() - 1000) {
        store.dispatch({
            type: REFRESH_DONE,
            done: [pixels, ...done],
            doneAt: Date.now()
        })
    }
}

// Used for canvas reset
export function clearCanvas() {
    const state = store.getState().canvas
    const width = state.width
    const height = state.height

    store.dispatch({
        type: CLEAR_CANVAS,
        payload: new Array(width * height).fill('white')
    })
}

// Used for a load button
// pictureFromImage inside does the image loading preparation
// turning it to pixels
export const load = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = () => finishLoad(input.files[0])
    document.body.appendChild(input)
    input.click()
    input.remove()

    const finishLoad = (file) => {
        if (file == null) return
        // FileReader can read users file without direct access to pixels though
        let reader = new FileReader()
        reader.addEventListener("load", () => {
            const image = document.createElement('img')
            image.onload = () => store.dispatch({
                type: DRAW_PICTURE,
                payload: pictureFromImage(image)
            })
            image.src = reader.result
        })
        // Reads downloaded file
        reader.readAsDataURL(file)
    }
}

