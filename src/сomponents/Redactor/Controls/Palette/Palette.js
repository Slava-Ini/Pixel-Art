import React, {useRef} from 'react'
import {CHANGE_COLOR} from '../../../../redux/actions/actionTypes'
import {connect} from "react-redux"
import styled from 'styled-components'

const ColorPalette = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  .currentColorWrapper {
    width: 20%;
    display: flex;
    justify-content: center;
  }
  
  .currentColor {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.currentColor};
  }
  
  .palette {
    width: 61%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(7, 2em);
    grid-template-rows: repeat(3, 2em);
    grid-column-gap: 1.2em;
    grid-row-gap: 0.75em;
    margin: 0 0;
  }
  
  .colorInputWrapper {
    width: 19%;
    display: flex;
    justify-content: center;
  }
  
  .colorInputLabel {
    width: 4em;
    height: 4em;
    border-radius: 50%;
    background: conic-gradient(from -88.36deg at 50% 50%, #CD05FF -20.63deg, #FF0000 20.63deg, #FF7A00 65.63deg, #DDFF0D 133.12deg, #00FF29 189.38deg, #00E0FF 245.62deg, #5783FF 290.63deg, #CD05FF 339.37deg, #FF0000 380.62deg);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  .colorInput {
    visibility: hidden;
  }
  
  .colorInputLabel:hover {
    box-shadow: none;
    cursor: pointer;
    transition: box-shadow 0.1s linear;
  }
`

const Color = styled.div`
  position: relative;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  
  &:hover {
    box-shadow: none;
    transition: box-shadow 0.1s linear;
  } 
  
`

const Palette = (props) => {

    const inputRef = useRef(null)
    const palette = [
        '#FFFFFF', '#0A0A0A', '#B20505', '#0066FF', '#00FF19', '#FF9900', '#AE01FF',
        '#D2D1D1', '#7D4B00', '#F40000', '#59CDFF', '#009E36', '#F0D800', '#FDA8FF',
        '#8C8C8C', '#D78305', '#FF03C8', '#00F0FF', '#00FFD1', '#FBFF37', '#DBFF8F'
    ]

    const changeColorHandler = e => {
        props.changeColor(e.target.value)
    }

    const handleColorSelect = (color) => {
        props.changeColor(color)
    }

    return (
        <ColorPalette
            currentColor={props.color}
        >
            <div className='currentColorWrapper'>
                <div className='currentColor'/>
            </div>
            <div className='palette'>
                {
                    palette.map((color, index) => (
                        <Color
                            key={`${color}${index}`}
                            className={`${color}${index}`}
                            color={color}
                            onClick={e => handleColorSelect(color, index)}
                        />
                    ))
                }
            </div>
            <div className='colorInputWrapper'>
                <label className='colorInputLabel' id='colorInput'>
                    <input
                        type='color'
                        className='colorInput'
                        id='colorInput'
                        ref={inputRef}
                        onChange={changeColorHandler}
                    />
                </label>
            </div>
        </ColorPalette>
    )
}

function mapStateToProps(state) {
    return {
        color: state.canvas.color
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeColor: (color) => dispatch({
            type: CHANGE_COLOR,
            color
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);