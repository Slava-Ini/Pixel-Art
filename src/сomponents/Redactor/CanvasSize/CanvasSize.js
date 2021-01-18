import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {CHANGE_SCALE, CHANGE_SIZE} from '../../../redux/actions/actionTypes'
import {clearCanvas} from '../../../redux/utils/controls'
import styled from 'styled-components'

const Modal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    
    .modalWindow {
      background-color: #D0FFBF;
      position: absolute;
      width: 35%;
      height: 30%;
      left: 0; 
      right: 0;
      top: 0;
      bottom: 0; 
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      font-family: 'Roboto', sans-serif;
    }
    
    .modalWarning {
      width: 70%;
      height: 35%;
      text-align: center;
      font-weight: lighter;
      font-size: 22px;
      margin-top: 10%;
    }
    
    .modalButtons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 50%;
      height: 35%;
      margin-bottom: 4%;
    }
    
    .modalButtons button {
      width: 40%;
      height: 50%;
      font-family: 'Roboto', sans-serif;
      font-size: 20px;
      font-weight: 300;
      background: #81FFB3;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
      border-radius: 2px;
      border: none;
      outline: none;
      cursor: pointer;
      
      &:first-child {
        background: #81FFB3;
      }
    
      &:nth-child(2n) {
        background: #FFE5E5;
      }
      
      &:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
      }
    
      &:active {
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.25);
      }
    }
    
    
`

const CanvasSizeWrapper = styled.div`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 88%;
  width: 13%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  
  >label {
    font-weight: bold;
    font-size: 14px;
  }
  
  .sizeValuesWrapper {
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  font-size: 18px;
  color: ${props => props.selectedValue ? '#FD0000' : 'black'};
  cursor: pointer;
  
  &:hover {
    font-weight: normal;
    transition: font-weight 0.2s linear;
  }
`

const CanvasSize = (props) => {

    const [displayWarning, setDisplayWarning] = useState(false)
    const [size, setSize] = useState(null)
    const selectedValue = useSelector(state => `${state.canvas.height}x${state.canvas.height}`)
    const sizeValues = ['16x16', '32x32', '64x64']


    const handleWarning = (e) => {
        setDisplayWarning(true)
        setSize(e.target.value)
    }

    const handleConfirm = () => {
        props.setSize(size)
        if (size === '64x64') props.changeScale(7)
        props.clearCanvas()
        setDisplayWarning(false)
    }

    const handleCancel = () => {
        setDisplayWarning(false)
    }

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            setDisplayWarning(!displayWarning)
        }
    }

    const renderModal = () => {
        return (
            <Modal onClick={handleCloseModal}>
                <div className='modalWindow'>
                    <div className='modalWarning'>
                        The image will be erased.
                        <br/>
                        Are you sure you want to change canvas size?
                    </div>
                    <div className='modalButtons'>
                        <button
                            className='modalButtonConfirm'
                            onClick={handleConfirm}
                        >Yes
                        </button>
                        <button
                            className='modalButtonDecline'
                            onClick={handleCancel}
                        >Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <React.Fragment>
            {displayWarning && renderModal()}
            <CanvasSizeWrapper>
                <label>CANVAS SIZE</label>
                <div className='sizeValuesWrapper'>
                    {
                        sizeValues.map((value, index) => {
                            return (
                                <Button
                                    key={index}
                                    selectedValue={selectedValue === value}
                                    value={value}
                                    onClick={e => handleWarning(e)}
                                >{value}</Button>
                            )
                        })
                    }
                </div>
            </CanvasSizeWrapper>
        </React.Fragment>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setSize: (value) => dispatch({
            type: CHANGE_SIZE,
            width: value.slice(0, 2),
            height: value.slice(3, 5)
        }),
        clearCanvas: () => clearCanvas(),
        changeScale: (scale) => dispatch({
            type: CHANGE_SCALE,
            scale
        }),
    }
}

export default connect(null, mapDispatchToProps)(CanvasSize);