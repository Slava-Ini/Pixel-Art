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
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  
    >img {
      width: 20%;
      height: 80%;
    }
  
    .likeImage:hover {
        filter: ${props => props.userId ? 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' : 'none'};
        cursor: ${props => props.userId ? 'pointer' : 'default'};
    }
    
    .zoomIn {
      position: absolute;
      right: 1em;
      width: 1.3em;
      height: 1.3em;
      cursor: pointer;
      
      img {
        height: 100%;
        width: 100%;
        
        &:hover {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        }
      }
    }
  }
  
  .likes {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 18px;
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
        margin-top: 5px;
        font-weight: 300;
        font-size: 20px;
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
        font-size: 16px;
        
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
const Modal = styled.div`
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


const GalleryCard = ({
                         imageUserId, category, size, userName, name, url, id, userLiked, createdAt, displayUserName,
                     }) => {

    const [likeDisplay, setLikeDisplay] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [userAvatarUrl, setUserAvatarUrl] = useState('')
    const [displayModal, setDisplayModal] = useState(false)

    const collection = projectFirestore.collection('images').doc(id)

    const {avatars} = useFirestore('avatars')
    const userId = store.getState().authentication.userId
    const date = new Date(createdAt.seconds * 1000)
    const filteredAvatar = avatars.filter(avatar => avatar.userId === imageUserId)

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

    const getMonthFromNumber = (date) => {
        let shortMonthName = new Intl.DateTimeFormat("en-US", {month: "short"}).format
        return shortMonthName(date)
    }
    const handleCloseModal = e => {
        if (e.target === e.currentTarget) {
            setDisplayModal(!displayModal)
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

    return (
        <Card
            isClicked={isClicked}
            userId={userId}
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

                {
                    displayUserName &&
                    <div
                        className='zoomIn'
                        onClick={() => setDisplayModal(true)}
                    >
                        <img src={MagnifyingGlass} alt='zoom_in'/>
                    </div>
                }
                {
                    displayModal &&
                    <Modal onClick={handleCloseModal}>
                        <AnimatePresence exitBeforeEnter>
                            <motion.img
                                src={url}
                                alt='zoomed_in_image'
                                variants={modalBackdrop}
                                initial='hidden'
                                animate='visible'
                            />
                        </AnimatePresence>
                    </Modal>
                }
            </div>
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
        </Card>
    )
}


export default GalleryCard;