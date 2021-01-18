import React, {useState} from 'react'
import Loader from '../../UI/General/Loader'
import styled from 'styled-components'
import deleteFirebaseElement from '../../../firebase/deleteFirebaseElement'
import GalleryCard from '../../UI/Gallery/GalleryCard'
import Garbage from '../../../images/delete_button/Garbage.svg'

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
  
  .optionWindow {
    background-color: #D0FFBF;
    position: absolute;
    width: 35%;
    height: 25%;
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
  
  .optionMessage {
    width: 55%;
    height: 35%;
    text-align: center;
    font-weight: lighter;
    font-size: 24px;
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

const MyPosts = styled.div`
  height: 25em;
  width: 75%;
  min-width: 30em;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: 11.72em;
  grid-column-gap: 4%;
  grid-row-gap: 1.5em;
  align-self: center;
  align-content: start;
  overflow-y: auto;
  overflow-x: visible;
  
  margin-left: 15px;
  
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
  background: rgba(227, 245, 241, 0.85);
  }
  ::-webkit-scrollbar-thumb {
  background: #8AE1CC;
  }
  ::-webkit-scrollbar-thumb:hover {
  background: #76bbac;
  }
  
  button {
    position: relative;
    border: none;
    outline: none;
    background: none;
    
    img {
      position: absolute;
      width: 2.3em;
      height: 2.3em;
      left: 8.5em;
      bottom: 1.2em;
      
      &:hover {
        filter: drop-shadow(0 1px 1px #cecece);
        cursor: pointer;
      }
      
      &:active {
        filter: drop-shadow(inset 0 1px 1px #cecece);
      }
    }
  }
`

const UserImages = props => {

    const [displayWarning, setDisplayWarning] = useState(false)
    const [imageData, setImageData] = useState({name: null, id: null})

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

    const handleCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            setDisplayWarning(!displayWarning)
        }
    }

    const renderModal = () => {
        return (
            <Modal onClick={handleCloseModal}>
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
            </Modal>
        )
    }

    const renderImages = () => {
        if (!props.images) {
            return <Loader/>
        } else {
            return (
                <MyPosts>
                    {
                        props.images
                            .map(doc => (
                                <div key={doc.id}>
                                    <GalleryCard
                                        category={doc.category}
                                        size={doc.size}
                                        url={doc.url}
                                        name={doc.name}
                                        id={doc.id}
                                        userName={doc.userName}
                                        userLiked={doc.userLiked}
                                        createdAt={doc.createdAt}
                                        imageUserId={doc.userId}
                                        displayUserName={false}
                                    />
                                    <button
                                        onClick={() => handleModalOpen(`${Math.floor(doc.createdAt.toDate() / 100000)}${doc.name}${doc.userId}`, doc.id)}
                                    >
                                        <img
                                            src={Garbage}
                                            alt='garbage'
                                        />
                                    </button>
                                </div>
                            ))
                    }
                </MyPosts>
            )
        }
    }

    return (
        <React.Fragment>
            {renderImages()}
            {displayWarning && renderModal()}
        </React.Fragment>
    )
}

export default UserImages