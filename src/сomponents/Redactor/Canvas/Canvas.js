import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {DRAW_PICTURE, CHANGE_TOOL, CHANGE_SCALE} from '../../../redux/actions/actionTypes'
import draw, {drawCanvas} from '../../../redux/actions/canvasActions'
import {send} from '../../../redux/utils/send'
import {undoPicture, refresh} from '../../../redux/utils/controls'
import styled from 'styled-components'

const CanvasWrapper = styled.div`
  background: rgba(227, 245, 241, 0.85);
  box-shadow: inset 5px 5px 7px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  height: 75%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  
  >canvas {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`

export const canvasRef = React.createRef()

const Canvas = (props) => {

    const [scale, setScale] = useState(props.scale)

    const [
        changeScale,
        sendPixels,
        drawPicture,
        drawCanvas
    ] = [
        props.changeScale,
        props.sendPixels,
        props.drawPicture,
        props.drawCanvas
    ]
    const [width, height] = [props.width, props.height]

    //Scale change
    useEffect(() => {
        changeScale(scale)
        sendPixels([])
    }, [scale, changeScale, sendPixels])

    //Creating default canvas
    useEffect(() => {
        const array = new Array(width * height).fill('white')
        drawPicture(array)
    }, [width, height, drawPicture])


    //Auto focus canvas for convenient shortcuts usage
    useEffect(() => {
        drawCanvas(props, canvasRef.current)
        canvasRef.current.focus = true
    }, [props.pixels, drawCanvas, props])


    const onMouseDownHandler = (downEvent) => {
        props.draw(downEvent)
        refresh(props.done, props.doneAt, props.pixels)
    }

    //Undo, toolSelection handler
    const onKeyDownHandler = (event) => {
        if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault()
            undoPicture(props.done)
        } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            switch (event.key) {
                case 'd':
                    event.preventDefault()
                    props.changeTool('draw')
                    break
                case 'f':
                    event.preventDefault()
                    props.changeTool('fill')
                    break
                case 'c':
                    event.preventDefault()
                    props.changeTool('circle')
                    break
                case 'r':
                    event.preventDefault()
                    props.changeTool('rectangle')
                    break
                case 'p':
                    event.preventDefault()
                    props.changeTool('pick')
                    break
                case 'l':
                    event.preventDefault()
                    props.changeTool('line')
                    break
                case 'j':
                    event.preventDefault()
                    props.changeTool('lighten')
                    break
                case 'k':
                    event.preventDefault()
                    props.changeTool('darken')
                    break
                default : return
            }
        }
    }

    //Changes canvas scale
    const mouseWheelHandler = (event) => {
        if (event.altKey) {
            if (scale < 15 && event.deltaY < 0) {
                setScale(props.scale + 1)
            } else if (scale > 5 && event.deltaY > 0) {
                setScale(props.scale - 1)
            }
        }
    }

    //Touch handler
    const touchEventHandler = (event) => {
        props.draw(event)
        refresh(props.done, props.doneAt, props.pixels)
    }

    return (
        <CanvasWrapper
            tabIndex={0}
            onKeyDown={e => onKeyDownHandler(e)}
        >
            <canvas
                ref={canvasRef}
                width={props.width * props.scale}
                height={props.height * props.scale}
                onMouseDown={e => onMouseDownHandler(e)}
                onWheel={mouseWheelHandler}
                onTouchStart={e => touchEventHandler(e)}
                style={{touchAction: 'none'}}
            />
        </CanvasWrapper>
    )
}

function mapStateToProps(state) {
    return {
        width: state.canvas.width,
        height: state.canvas.height,
        pixels: state.canvas.pixels,
        scale: state.canvas.scale,
        color: state.canvas.color,
        tools: state.canvas.tools,
        done: state.canvas.done,
        doneAt: state.canvas.doneAt
    }
}

function mapDispatchToProps(dispatch) {
    return {
        drawPicture: (array) => dispatch({
            type: DRAW_PICTURE,
            payload: array
        }),
        changeScale: (scale) => dispatch({
            type: CHANGE_SCALE,
            scale
        }),
        draw: (event) => draw(event),
        changeTool: (tool) => dispatch({
            type: CHANGE_TOOL,
            payload: tool
        }),
        drawCanvas: (props, canvas) => drawCanvas(props, canvas),
        sendPixels: (pixels) => send(pixels)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);