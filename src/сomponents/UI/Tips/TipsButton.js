import React, {useState} from 'react'
import styled from 'styled-components'
import Info from '../../../images/controls/Info.svg'
import Carousel from 'react-elastic-carousel'
import TipOne from '../../../images/tips/TipOne.png'
import TipTwo from '../../../images/tips/TipTwo.png'
import TipThree from '../../../images/tips/TipThree.png'
import TipFour from '../../../images/tips/TipFour.png'
import TipFive from '../../../images/tips/TipFive.png'

const ButtonWrapper = styled.button`
  position: ${props => props.displayName ? 'relative' : 'default'};
  height: 10%;
  width: auto;
  border: none;
  background: none;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  margin-bottom: 10%;

  &:hover {
    cursor: pointer;
  
    .info {
      visibility: visible;
      opacity: 1;
    }
  
    img {
      position: relative;
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
      transition: filter 0.2s linear;
     }
  }
  
  &:active {
    img {
      filter: none;
    }
  }

  img {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    width: ${props => props.displayName ? '60%' : '6vh'};
    height: auto;
  }
  
  

  .info {
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
    font-size: 1.8vh;
    color: #616060;
  }
`

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  font-family: 'Roboto', sans-serif;
  backdrop-filter: blur(5px);
  
  .rec-carousel-wrapper {
    background-color: #D0FFBF;
    position: absolute;
    width: 60%;
    height: 75%;
    left: 0; 
    right: 0;
    top: 0;
    bottom: 0; 
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  .rec-carousel {
    width: 95%;
    height: 95%;
  }
  
  .rec-item-wrapper {
    height: 100%;
  }
  
  .rec-arrow {
    height: 100%;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    font-size: 4vh;
    
    &:disabled {
      visibility: hidden;
      border: none;
      outline: none;
      box-shadow: none;
      transition: 0s;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
    
    &:hover {
      background: none;
      border: none;
      outline: none;
      box-shadow: none;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
    
    &:active {
      background: none;
      border: none;
      outline: none;
      box-shadow: none;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
    
    &:focus {
      background: none;
      border: none;
      outline: none;
      box-shadow: none;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
  }
  
  .rec-pagination {
    margin: 0;
    position: absolute;
    bottom: 2%;
    
    .rec-dot {
      background-color: #ffffff;
      outline: none;
      border: none;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
      
      &:hover {
        border: 1px solid #931FCA;
      }
    }
    
    .rec-dot_active {
      background-color: #931FCA;
    }
  }
  
  img {
    min-width: 26vw;
    width: 55%;
    min-height: 16vh;
    height: auto; 
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));
  }
`

const Tip = styled.div`
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  .tipDescription {
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
    font-size: 4vh;
    text-align: center;
    max-width: 80%;  
    margin-top: 1em;
    
    
    .tipTag {
      color: #931FCA;
      font-weight: 300;
    }
  }
`

const TipsButton = (props) => {

    const tips = [
        {
            imageSource: TipOne,
            imageAlt: 'TipOne',
            descriptionFirstHalf: 'Create an account by filling forms and clicking ',
            descriptionSecondHalf: 'button',
            descriptionTag: 'Register '
        },
        {
            imageSource: TipTwo,
            imageAlt: 'TipTwo',
            descriptionFirstHalf: 'Use Editor to create your image or ',
            descriptionSecondHalf: 'the existing one',
            descriptionTag: 'Load '
        },
        {
            imageSource: TipThree,
            imageAlt: 'TipThree',
            descriptionFirstHalf: '',
            descriptionSecondHalf: 'your image to Gallery',
            descriptionTag: 'Upload '
        },
        {
            imageSource: TipFour,
            imageAlt: 'TipFour',
            descriptionFirstHalf: 'Customize your ',
            descriptionSecondHalf: '',
            descriptionTag: 'Profile'
        },
        {
            imageSource: TipFive,
            imageAlt: 'TipFive',
            descriptionFirstHalf: 'Check out the community works in ',
            descriptionSecondHalf: '',
            descriptionTag: 'Gallery'
        }
    ]

    const [displayModal, setDisplayModal] = useState(false)

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            setDisplayModal(!displayModal)
        }
    }

    return (
        <React.Fragment>
            <ButtonWrapper
                onClick={() => setDisplayModal(!displayModal)}
                displayName={props.displayName}
            >
                <img src={Info} alt='info'/>
                {props.displayName &&
                    <span className='info'>Info</span>
                }
            </ButtonWrapper>
            {
                displayModal &&
                <Modal onClick={handleCloseModal}>
                    <Carousel
                        isRTL={false}
                        itemsToShow={1}
                    >
                        {
                            tips.map(tip => (
                                <Tip>
                                    <img src={tip.imageSource} alt={tip.imageAlt}/>
                                    <div className='tipDescription'>
                                        {tip.descriptionFirstHalf}
                                        <span className='tipTag'>{tip.descriptionTag}</span>
                                        {tip.descriptionSecondHalf}
                                    </div>
                                </Tip>
                            ))
                        }
                    </Carousel>
                </Modal>
            }
        </React.Fragment>
    )
}

export default TipsButton