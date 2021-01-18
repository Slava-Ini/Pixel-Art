import {store} from '../../index'
import {canvasRef} from "../../сomponents/Redactor/Canvas/Canvas"
import handleCallTool from '../utils/handleCallTool'
import {send} from '../utils/send'

let grid = false
let display = []

// Main entry point of canvas drawing handling
// calls the necessary tool with the fired
// mouse/touch event and position of cursor
const toolHandler = (event) => {
    const state = store.getState().canvas

    let pos = pointerPosition(event, canvasRef)
    let tool = state.currentTool
    handleCallTool(tool, pos, pos)

    if (event.type === 'mousedown') {
        if (event.button !== 0) return
        let move = (moveEvent) => {
            if (moveEvent.buttons === 0) {
                send(display)
                display = []
                canvasRef.current.removeEventListener("mousemove", move)
            } else {
                let newPos = pointerPosition(moveEvent, canvasRef)
                if (tool === 'draw' || tool === 'lighten' || tool === 'darken') {
                    handleCallTool(tool, pos, newPos)
                    pos = newPos
                } else {
                    handleCallTool(tool, pos, newPos)
                }
            }
        }
        canvasRef.current.addEventListener("mousemove", move)

    } else if (event.type === 'touchstart') {
        let pos = pointerPosition(event.touches[0], canvasRef)
        let move = moveEvent => {
            let newPos = pointerPosition(moveEvent.touches[0], canvasRef)
            if (tool === 'draw' || tool === 'lighten' || tool === 'darken') {
                handleCallTool(tool, pos, newPos)
                pos = newPos
            } else {
                handleCallTool(tool, pos, newPos)
            }
        }
        let end = () => {
            send(display)
            canvasRef.current.removeEventListener("touchmove", move)
            canvasRef.current.removeEventListener("touchend", end)
        }
        canvasRef.current.addEventListener("touchmove", move)
        canvasRef.current.addEventListener("touchend", end)

    }
}

// Grid toggle
export const toggleGrid = () => {
    if (grid) grid = !grid
    else grid = true
    send([])
}

// Main draw function, creates a pixelated layout
// and displays it on canvas
export const drawCanvas = (props, canvas, scale = props.scale, display = false, picture, drawGrid = grid) => {
    let pixels = props.pixels
    if (display) pixels = picture
    const cx = canvas.getContext('2d')

    for (let y = 0; y < props.height; y++) {
        for (let x = 0; x < props.width; x++) {
            let color = props.color
            if (!pixels) color = props.color
            else color = pixels[x + y * props.width]
            cx.fillStyle = color
            cx.fillRect(x * scale, y * scale, scale, scale)

            if (drawGrid) {
                cx.beginPath()
                cx.moveTo(x * scale, y * scale)
                cx.lineTo(x * scale, y * scale + scale)
                cx.moveTo(x * scale, y * scale)
                cx.lineTo(x * scale + scale, y * scale)
                cx.lineWidth = 0.5
                cx.strokeStyle = 'gray'
                cx.stroke()
            }
        }
    }
}

// Used for temporal pixel update and displaying
// without actual state mutating (for circle, rectangle and line drawing)
export const preDraw = (pixels) => {
    display = pixels
    const copy = send(pixels, true)
    drawCanvas(store.getState().canvas, canvasRef.current, store.getState().canvas.scale, true, copy)
}

// Returns the current cursor position
// in the pixel coordinate system
const pointerPosition = (event, canvas) => {
    const rect = canvas.current.getBoundingClientRect()
    return {
        x: Math.floor((event.clientX - rect.left) / store.getState().canvas.scale),
        y: Math.floor((event.clientY - rect.top) / store.getState().canvas.scale)
    }
}

export default toolHandler