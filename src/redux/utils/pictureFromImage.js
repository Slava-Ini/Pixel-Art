import {store} from "../../index"

// Used for creating picture from the canvas image
// for utilities like downloading on hard drive or uploading to gallery
export function pictureFromImage(image) {
    const state = store.getState().canvas
    //Max width/height are set to 100
    let width = Math.min(state.width, image.width)
    let height = Math.min(state.height, image.height)
    const canvas = document.createElement('canvas')
    canvas.width = state.width
    canvas.height = state.height
    let cx = canvas.getContext("2d")
    // If downloaded image is smaller than the canvas size, puts this image in center
    // of the canvas
    let data
    if (width < state.width || height < state.height) {
        const xOffSet = (state.width - width) / 2
        const yOffSet = (state.height - height) / 2
        cx.drawImage(image, 0, 0, width, height, xOffSet, yOffSet, width, height)
        data = cx.getImageData(0, 0, state.width, state.height).data
    } else {
        cx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
        data = cx.getImageData(0, 0, width, height).data
    }
    let pixels = []

    // getImageData is canvas' method to read pixels
    // returns imageData object with sizes of picture
    // it's data property contains an array of color components
    // decimal e.g.(196, 114, 35, 255 (alpha)) etc.
    // we need hexadecimal for our colors - like #00ff00
    // e.g. 200 is 8c , so (200, 200, 200, 255) is #8c8c8c

    // If necessary fills up a string with a zero before a number/letter
    function hex(n) {
        return n.toString(16).padStart(2, "0")
    }

    // Maps the data array to transform decimal to hexadecimal
    // i+= 4 to skip the alpha value of array (always 4th)
    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3)
        let [alpha] = data.slice(i + 3, i + 4)
        // Alpha checks if the pixel is transparent
        // if so, makes it's color default canvas color
        if (alpha < 100) {
            pixels.push('#e2e0e0')
        } else {
            pixels.push("#" + hex(r) + hex(g) + hex(b))
        }
    }
    return pixels
}
