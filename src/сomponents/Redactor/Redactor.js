import React from 'react'
import Tools from './Tools/Tools'
import Canvas from './Canvas/Canvas'
import Controls from './Controls/Controls'
import CanvasSize from './CanvasSize/CanvasSize'
import Palette from './Controls/Palette/Palette'
import styled from 'styled-components'
import CanvasScale from './CanvasScale/CanvasScale'
import {motion} from 'framer-motion'

const RedactorWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 85%;
  height: 85%;
  
  >div {
    height: 100%;
  }
  
  .canvasMain {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .canvasControlPanel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #D1EAE6;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    height: 21%;
  }
`

const Redactor = props => {

    return (
        <RedactorWrapper
            variants = {props.containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <Tools/>
            <div className='canvasMain'>
                <Canvas/>
                <div className='canvasControlPanel'>
                    <CanvasSize/>
                    <Palette/>
                    <CanvasScale/>
                </div>
            </div>
            <Controls/>
        </RedactorWrapper>
    )
}

export default Redactor
