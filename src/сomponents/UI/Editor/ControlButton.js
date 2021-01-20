import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {toggleGrid} from '../../../redux/actions/canvasActions'
import {save, undoPicture, clearCanvas, load} from '../../../redux/utils/controls'

const Button = styled.button`
    position: relative;
    flex-basis: 15%;
    border: none;
    background: none;
    box-sizing: border-box;
    outline: none;
    margin-bottom: 6%;
    
    &:hover {
      cursor: pointer;
    
      .controlName {
        visibility: visible;
        opacity: 1;
      }
        
      img {
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
      }
    }
    
    &:active {
      img {
          filter: none;
        }
    }
    
    img {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      width: 60%;
      height: auto;
    }
     
    .controlName {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.3s, opacity 0.3s ease-in-out;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: 85%;
      left: 0;
      right: 0;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 1.6vh;
      color: #616060;
    }
`

const ControlButton = props => {

    let name = props.name

    const clickHandler = (name) => {
        switch (name) {
            case 'Undo': {
                props.undo(props.done, props.doneAt, props.pixels)
                break
            }
            case 'Grid': {
                props.toggleGrid()
                break
            }
            case 'Save': {
                props.save(props.width, props.height, props.scale)
                break
            }
            case 'Save Miniature': {
                props.save(props.width, props.height, 1)
                break
            }
            case 'Load': {
                props.load()
                break
            }
            case 'Clear': {
                props.clear()
                break
            }
            default: return
        }
    }

    const renderName = () => {
        switch (name) {
            case 'Save Miniature':
                return (
                    <span className='controlName'>
                        <span>
                            {name[0].toUpperCase() + name.slice(1)}
                        </span>
                    </span>
                )
            case 'Undo':
                return (
                    <span className='controlName'>
                        <span>{name[0].toUpperCase() + name.slice(1) +  ' - '}</span>
                        <span style={{color: '#B41616'}}>Ctrl + Z</span>
                    </span>
                )
            default :
                return (
                    <span className='controlName'>
                        <span>{name[0].toUpperCase() + name.slice(1)}</span>
                    </span>
                )
        }
    }

    return (
        <Button
            onClick={() => clickHandler(name)}
            name={props.name}
        >
            <img
                alt={props.name}
                src={props.src}
            />
            {renderName()}
        </Button>
    )
}

function mapStateToProps(state) {
    return {
        done: state.canvas.done,
        doneAt: state.canvas.doneAt,
        pixels: state.canvas.pixels,
        width: state.canvas.width,
        height: state.canvas.height,
        scale: state.canvas.scale
    }
}

function mapDispatchToProps() {
    return {
        undo: (done, doneAt, pixels) => undoPicture(done, doneAt, pixels),
        toggleGrid: () => toggleGrid(),
        save: (width, height, scale) => save(width, height, scale),
        load: () => load(),
        clear: () => clearCanvas()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);
