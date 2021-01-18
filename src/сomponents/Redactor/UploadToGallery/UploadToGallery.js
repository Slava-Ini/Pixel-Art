import React, {useState} from 'react'
import UploadFile from '../../UI/General/UploadFile'
import styled from 'styled-components'
import {store} from '../../../index'
import UploadIcon from '../../../images/controls/Upload to Gallery.svg'
import UploadIconBW from '../../../images/controls/Upload to Gallery(BW).svg'

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`

const Button = styled.button`
    position: relative;
    flex-basis: 20%;
    border: none;
    background: none;
    box-sizing: border-box;
    outline: none;
    
    &:hover {
        cursor: ${props => props.authorized ? 'pointer' : 'default' };
    
        .upload {
          visibility: visible;
          opacity: 1;
        }
        
        img {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        }
    }
    
    img {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      width: 70%;
      height: 70%;
     }
     
     .upload {
      visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.3s ease-in-out;
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
        font-size: 12px;
        color: #616060;
     }
    `

const UploadToGallery = () => {

    const [display, setDisplay] = useState(false)
    const state = store.getState()
    const userName = state.authentication.userName
    const userId = state.authentication.userId
    const size = `${state.canvas.width} x ${state.canvas.height}`

    const handleCloseModal = e => {
        if (e.target === e.currentTarget) {
            setDisplay(!display)
        }
    }

    return (
        <React.Fragment>
            <Button
                authorized={!!userId}
                disabled={!userId}
                onClick={() => setDisplay(!display)}
            >
                {
                    userId
                        ?
                        <img src={UploadIcon} alt={'upload'}/>
                        :
                        <img src={UploadIconBW} alt={'upload'}/>
                }
                <span className='upload'>Upload to Gallery</span>
            </Button>

            {
                display &&
                <Modal onClick={handleCloseModal}>
                    <UploadFile
                        handleCloseModal={handleCloseModal}
                        name={true}
                        userName={userName}
                        size={size}
                        userId={userId}
                        display={display}
                        folder={'Gallery/'}
                        collection={'images'}
                    />
                </Modal>
            }
        </React.Fragment>
    )
}

export default UploadToGallery;