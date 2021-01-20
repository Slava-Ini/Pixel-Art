import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

const CanvasScaleWrapper = styled.div`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 88%;
  width: 13%;
  margin-right: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  
  >label {
    font-weight: bold;
    font-size: 1.6vh;
  }
  
  .scaleWrapper {
    position: relative;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .scale {
    text-align: center;
    font-weight: lighter;
    font-size: 4.4vh;
  }
  
  .scaleTipWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .scaleTip {
    visibility: hidden;
    font-weight: 500;
    font-size: 1.6vh;
    color: #B41616;
  }
  
  &:hover {
    .scaleTip {
      visibility: visible;
    }
  }
`

const CanvasScale = () => {

    const scale = useSelector(state => state.canvas.scale)

    return (
        <CanvasScaleWrapper>
            <label>SCALE</label>
            <div className='scaleWrapper'>
                <div className='scale'>{scale}0%</div>
                <div className='scaleTipWrapper'>
                    <div className='scaleTip'>Alt + Scroll</div>
                </div>
            </div>
        </CanvasScaleWrapper>
    )
}

export default CanvasScale