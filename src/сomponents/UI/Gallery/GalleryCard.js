import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {projectFirestore} from '../../../firebase/config'
import {store} from '../../../index'
import ImageLabel from '../General/ImageLabel'
import Heart_Filled from '../../../images/likes_panel/Heart_Filled.svg'
import Heart_Empty from '../../../images/likes_panel/Heart_Empty.svg'
import MagnifyingGlass from '../../../images/likes_panel/Magnifying_Glass.svg'
import useFirestore from '../../../hooks/useFirestore'
import defaultAvatar from '../../../images/avatar/Avatar.png'
import {motion, AnimatePresence} from 'framer-motion'
import deleteFirebaseElement from '../../../firebase/deleteFirebaseElement'
import Garbage from '../../../images/delete_button/Garbage.svg'

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(227, 245, 241, 0.85);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  
  &:hover {
   .info {
    opacity: 1;
    visibility: visible;
   } 
  }

  img {
    width: 100%;
    height: 85%;
    border-radius: 4px 4px 0 0;
  }

  .likesWrapper {
    position: relative;
    min-height: ${props => props.displayUserName ? '3.6vh' : '2vh'};;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.displayUserName ? 'none' : '0.2vh'};;
  
    >img {
      height: ${props => props.displayUserName ? '2.8vh' : '2vh'};
      width: auto;
      margin-right: 0.8vh;
    }
  
    .likeImage:hover {
        filter: ${props => props.userId ? 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' : 'none'};
        cursor: ${props => props.userId ? 'pointer' : 'default'};
    }
    
    .zoomIn {
      position: absolute;
      right: 1vh;
      top: 0;
      bottom: 0;
      width: auto;
      height: 100%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
     
      img {
        height: 2vh;
        width: auto;
        vertical-align: center;
        
        &:hover {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        }
      }
    }
    
    .deleteButton {
      border: none;
      background: none;
      outline: none;
      position: absolute;
      right: 0.5vh;
      top: 1%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
     
      img {
        height: 2.5vh;
        width: auto;
        vertical-align: center;
        
        &:hover {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        }
      }
    }
  }
  
  .likes {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: ${props => props.displayUserName ? '2.2vh' : '2vh'};;
  }
  
  .info {
      display: flex;
      opacity: 0;
      visibility: hidden;
      transition: opacity 300ms, visibility 300ms;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      background: rgba(227, 245, 241, 0.9);
      width: 100%;
      height: 85%;
      
      .info_name {
        text-align: center;
        font-weight: 300;
        font-size: 2.5vh;
        border-bottom: 1px solid gray;
        padding-bottom: 2px;
        padding-top: 0;
      }
      
      .info_information {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1.8vh;
        
        >div {
          padding-left: 5px;
        }
        
        .info_information_user {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          
          img {
            width: 20%;
            height: auto;
            background-size: contain;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
            margin-left: 1em;
          }
          
          .info_information_user_name {
            word-break: break-all;
            text-align: left;
            color: #026293;
            width: 45%;
            margin-left: 0.5em;
          }
        }
        
        .info_information_picture {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
      }
    } 
`
const ZoomModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  
  img {
    width: 35em;
    height: 35em;
    border-radius: 4px;
  }
`
const WarningModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  font-family: 'Roboto', sans-serif;
  backdrop-filter: blur(5px);
  
  .optionWindow {
    background-color: #D0FFBF;
    position: absolute;
    width: 30%;
    height: 25%;
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
  
  .optionMessage {
    width: 70%;
    height: 15vh;
    text-align: center;
    font-weight: lighter;
    font-size: 3vh;
    margin-top: 10%;
  } 
  
  .optionButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 50%;
    height: 35%;
    margin-bottom: 4%;
  }
  
  .optionButtons button {
    width: 40%;
    max-width: 5.5vw;
    height: 75%;
    font-family: 'Roboto', sans-serif;
    font-size: 2.2vh;
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

const GalleryCard = ({imageUserId, category, size, userName, name, url, id, userLiked, createdAt, displayUserName,}) => {

    const [likeDisplay, setLikeDisplay] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [userAvatarUrl, setUserAvatarUrl] = useState('')

    const [displayModal, setDisplayModal] = useState(false)
    const [displayWarning, setDisplayWarning] = useState(false)
    const [imageData, setImageData] = useState({name: null, id: null})

    const collection = projectFirestore.collection('images').doc(id)
    const modalBackdrop = {
        visible: {
            opacity: 1,
            scale: 1,
            transition: {duration: 0.2}
        },
        hidden: {
            opacity: 0,
            scale: 0.4,
            transition: {duration: 0.2}
        }
    }

    const {avatars} = useFirestore('avatars')
    const userId = store.getState().authentication.userId
    const date = new Date(createdAt.seconds * 1000)
    const filteredAvatar = avatars.filter(avatar => avatar.userId === imageUserId)

    const getMonthFromNumber = (date) => {
        let shortMonthName = new Intl.DateTimeFormat("en-US", {month: "short"}).format
        return shortMonthName(date)
    }

    const handleCloseWarning = e => {
        if (e.target === e.currentTarget) {
            setDisplayWarning(!displayWarning)
        }
    }
    const handleCloseModal = e => {
        if (e.target === e.currentTarget) {
            setDisplayModal(!displayModal)
        }
    }

    const handleDelete = () => {
        deleteFirebaseElement(
            'Gallery/',
            imageData.name,
            'images',
            imageData.id
        )
        setDisplayWarning(false)
    }
    const handleCancel = () => {
        setDisplayWarning(false)
    }

    const handleModalOpen = (name, id) => {
        setDisplayWarning(true)
        setImageData({name, id})
    }
    // Like clicks handler
    const clickHandler = () => {
        if (!userId) {
            return
        } else {
            if (!isClicked) {
                setLikeDisplay(likeDisplay + 1)
                setIsClicked(true)
                if (userLiked.indexOf(userId) < 0) {
                    collection.set({userLiked: [...userLiked, userId]}, {merge: true})
                }
            } else {
                setLikeDisplay(likeDisplay - 1)
                setIsClicked(false)
                collection.set({userLiked: userLiked.filter(item => item !== userId)}, {merge: true})
            }
        }
    }

    // Display clicked/not clicked likes
    useEffect(() => {
        collection.get().then(snap => {
            setLikeDisplay(snap.data().userLiked.length)
            if (snap.data().userLiked.indexOf(userId) >= 0) {
                setIsClicked(true)
            }
        })

    }, [userId])
    // Set user avatar url
    useEffect(() => {
        if (filteredAvatar.length === 1) {
            setUserAvatarUrl(filteredAvatar[0].url)
        } else {
            setUserAvatarUrl(defaultAvatar)
        }
    }, [avatars, filteredAvatar])


    const renderWarning = () => {
            return (
                <WarningModal onClick={handleCloseWarning}>
                    <div className='optionWindow'>
                        <div className='optionMessage'>Are you sure you want to delete this image?</div>
                        <div className='optionButtons'>
                            <button
                                className='btnConfirm'
                                onClick={handleDelete}
                            >Yes</button>

                            <button
                                className='btnDecline'
                                onClick={handleCancel}
                            >Cancel</button>
                        </div>
                    </div>
                </WarningModal>
            )
        }
    const renderModal = () => {
        return (
            <ZoomModal onClick={handleCloseModal}>
                <AnimatePresence exitBeforeEnter>
                    <motion.img
                        src={url}
                        alt='zoomed_in_image'
                        variants={modalBackdrop}
                        initial='hidden'
                        animate='visible'
                    />
                </AnimatePresence>
            </ZoomModal>
            )
    }
    const renderZoomIn = () => {
        return (
            <div
                className='zoomIn'
                onClick={() => setDisplayModal(true)}
            >
                <img src={MagnifyingGlass} alt='zoom_in'/>
            </div>
        )
    }
    const renderDelete = () => {
        return (
            <button
                className='deleteButton'
                onClick={() => handleModalOpen(`${Math.floor(createdAt.toDate() / 100000)}${name}${userId}`, id)}
            >
                <img
                    src={Garbage}
                    alt='garbage'
                />
            </button>
        )
    }
    const renderInfo = () => {
        return (
            <div className='info'>
                <div className='info_name'>
                    {name}
                </div>
                <div className='info_information'>
                    {
                        displayUserName &&
                        <div className='info_information_user'>
                            <img src={userAvatarUrl} alt='userAvatar'/>
                            <div className='info_information_user_name'>{userName}</div>
                        </div>
                    }
                    <div className='info_information_picture'>
                        <div>{category.slice(0, 1).toUpperCase() + category.slice(1)}</div>
                        <div>{`${date.getDate()} ${getMonthFromNumber(date)} ${date.getFullYear()}`}</div>
                        <div>{size}</div>
                    </div>
                </div>
                <ImageLabel
                    labelType={'info'}
                    url={url}
                    category={category}
                    size={size}
                />
            </div>
        )
    }

    return (
        <Card
            isClicked={isClicked}
            userId={userId}
            displayUserName={displayUserName}
        >
            <img
                alt={name}
                src={url}
            />
            <ImageLabel
                labelType={'icons'}
                url={url}
                category={category}
                size={size}
            />
            <div className='likesWrapper'>
                {
                    isClicked
                        ?
                        <img
                            src={Heart_Filled}
                            alt='Heart_Filled'
                            className='likeImage'
                            onClick={clickHandler}
                        />
                        :
                        <img
                            src={Heart_Empty}
                            alt='Heart_Empty'
                            className='likeImage'
                            onClick={clickHandler}
                        />
                }
                <div
                    className='likes'
                >{likeDisplay}</div>

                { displayUserName && renderZoomIn() }
                { displayModal && renderModal() }

                { !displayUserName && renderDelete() }
                { displayWarning && renderWarning() }
            </div>

            {renderInfo()}
        </Card>
    )
}


export default GalleryCard;