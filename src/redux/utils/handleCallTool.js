import {store} from '../../index'
import {preDraw} from '../actions/canvasActions'
import {send} from './send'
import {CHANGE_COLOR} from '../actions/actionTypes'

// --- All the tools functions with their utilities functions as well
// --- for convenience tools are declared with a function key word,
// --- utilities are made using arrow functions

// Around used for the fill tool to recognize
// four pixels around the point
const around = [
    {dx: -1, dy: 0}, {dx: 1, dy: 0},
    {dx: 0, dy: -1}, {dx: 0, dy: 1}
]

// Switch for calling the tool according to state
const handleCallTool = (tool, pos, newPos) => {
    switch (tool) {
        case 'draw':
            drawToolHandler(pos, newPos)
            break
        case 'rectangle':
            rectangleToolHandler(pos, newPos)
            break
        case 'fill':
            fillToolHandler(pos, newPos)
            break
        case 'pick':
            pickToolHandler(pos, newPos)
            break
        case 'circle':
            circleToolHandler(pos, newPos)
            break
        case 'line':
            lineToolHandler(pos, newPos)
            break
        case 'lighten':
            lightenToolHandler(pos, newPos)
            break
        case 'darken':
            darkenToolHandler(pos, newPos)
            break
        default:
            return
    }
}


// Util function for the lighten/darken tools
const brightnessHandler = (pos, newPos, amount) => {
    const state = store.getState().canvas
    let color = state.pixels[pos.x + pos.y * state.width]
    function drawPixel(pos) {
        let line = drawLine(pos, newPos, color, true, amount)
        send(line)
    }
    drawPixel(pos)
}

// Used to draw a continuous line without breaking
// as the normal 'move' event firing is too slow for an unbroken drawing
// for some extra info on drawLine check images/drawLine.png
const drawLine = (from, to, color, brightness, amount) => {
    const state = store.getState().canvas
    let points = []
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
        if (from.x > to.x) [from, to] = [to, from]
        let slope = (to.y - from.y) / (to.x - from.x)
        for (let {x, y} = from; x <= to.x; x++) {
            if (brightness) {
                color = colorShade(state.pixels[x + Math.round(y) * state.width], amount)
            }
            points.push({x, y: Math.round(y), color})
            y += slope
        }
    } else {
        if (from.y > to.y) [from, to] = [to, from]
        let slope = (to.x - from.x) / (to.y - from.y)
        for (let {x, y} = from; y <= to.y; y++) {
            if (brightness) {
                color = colorShade(state.pixels[Math.round(x) + y * state.width], amount)
            }
            points.push({x: Math.round(x), y, color})
            x += slope
        }
    }
    return points
}

// Util function for lighten or darken the input color by amount
const colorShade = (color, amount) => {
    if (!color) return
    return '#' + color
        .replace(/^#/, '')
        .replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount))
        .toString(16))
        .substr(-2));
}


// Draw tool
function drawToolHandler(pos, newPos) {
    // Here and in latter callback function used for the proper
    // position definition
    function drawPixel(pos) {
        let line = drawLine(pos, newPos, store.getState().canvas.color)
        send(line)
    }
    drawPixel(pos)
}

// Rectangle tool
function rectangleToolHandler(start, next) {
    function drawRectangle(next) {
        let xStart = Math.min(start.x, next.x)
        let yStart = Math.min(start.y, next.y)
        let xEnd = Math.max(start.x, next.x)
        let yEnd = Math.max(start.y, next.y)
        let drawn = []
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: store.getState().canvas.color})
            }
        }
        preDraw(drawn)
    }
    drawRectangle(next)
}

// Fill tool
function fillToolHandler(_, {x, y}) {
    const state = store.getState().canvas
    // Color of the pixel by given coordinates
    let targetColor = state.pixels[x + y * state.width]
    // Array of the drawn pixels
    let drawn = [{x, y, color: state.color}]
    // Loop goes till no new objects are added to 'drawn'
    for (let done = 0; done < drawn.length; done++) {
        // Goes like snake first checking all adjacent for new, and then when finished for an origin pixel's
        // adjacent pixels
        for (let {dx, dy} of around) {
            // New coords x and y
            let x = drawn[done].x + dx, y = drawn[done].y + dy
            // Checks if it goes out of boundaries
            if (x >= 0 && x < state.width &&
                y >= 0 && y < state.height &&
                // Checks if the pixels are the same color as a starting one
                // dispatch(send) happens after the loop, so that the new color is not applied before the loop ends
                // even for the starting pixel
                state.pixels[x + y * state.width] === targetColor &&
                !drawn.some(p => p.x === x && p.y === y)) {
                drawn.push({x, y, color: state.color})
            }
        }
    }
    send(drawn)
}

// Color pick tool
function pickToolHandler(_, pos) {
    const state = store.getState().canvas
    store.dispatch({
        type: CHANGE_COLOR,
        color: state.pixels[pos.x + pos.y * state.width]
    })
}

// Circle tool
function circleToolHandler(pos, to) {
    const state = store.getState().canvas
    // Same like rectangle pos taken as an argument is a starting point, pos(to) given to a
    // drawCircle function is a changed pos, which indicates updated (new) position
    function drawCircle(to) {
        // Using Pythagorean theorem we find out the circle's base radius
        let radius = Math.sqrt(Math.pow(to.x - pos.x, 2) +
            Math.pow(to.y - pos.y, 2))
        let radiusC = Math.ceil(radius)
        let drawn = []
        // Loop will occur the number of times depends on radiusC
        // loop creates a number of iterations so they fit the square
        // to exclude excessive pixels we check whether the current pixel's radius (dist)
        // belongs to the circles radius(radius) using Pythagorean theorem
        // if not we jump to an increment (++) using 'continue'
        for (let dy = -radiusC; dy <= radiusC; dy++) {
            for (let dx = -radiusC; dx <= radiusC; dx++) {
                let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                if (dist > radius) continue
                let y = pos.y + dy, x = pos.x + dx
                // Checks if new coords are out of canvas
                if (y < 0 || y >= state.height ||
                    x < 0 || x >= state.width) continue
                drawn.push({x, y, color: state.color})
            }
        }
        preDraw(drawn)
    }

    drawCircle(to)
}

// Straight line tool
function lineToolHandler(pos, newPos) {
    function drawStraightLine(pos) {
        let line = drawLine(pos, newPos, store.getState().canvas.color)
        preDraw(line)
    }
    drawStraightLine(pos)
}

// Lighten tool
function lightenToolHandler(pos, newPos) {
    brightnessHandler(pos, newPos, 2)
}

// Darken tool
function darkenToolHandler(pos, newPos) {
    brightnessHandler(pos, newPos, -2)
}

export default handleCallTool