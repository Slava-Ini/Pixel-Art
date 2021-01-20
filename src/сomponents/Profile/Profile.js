import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import UploadFile from '../UI/General/UploadFile'
import useFirestore from '../../hooks/useFirestore'
import deleteFirebaseElement from '../../firebase/deleteFirebaseElement.js'
import UserName from './ProfileName/UserName'
import Loader from '../UI/General/Loader'
import Avatar from '../../images/avatar/Avatar.png'
import UserImages from './ProfileUserImages/UserImages'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const ProfileWrapper = styled(motion.div)`
  width: 50%;
  max-width: 60rem;
  height: 80%;
  max-height: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(227, 245, 241, 0.85);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 40%;
  width: 80%;
  margin-top: 2vh;
  
  .avatar {
    position: relative;
    border-radius: 4px;
    width: 30%;
    height: auto;
    margin-bottom: 0.5em;
    margin-left: 2em;
    
    .defaultAvatar {
      border-radius: 4px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    
    .customAvatar {
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    
    .imageOverlay {
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    } 
  }
  
  .userData {
    margin-right: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
  }
  
  .email {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 1.4vw;
  }
`

const PostsWrapper = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  .label {
    margin-bottom: 1em;
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
    font-size: 1.8vw;
  }
`

const Profile = props => {

    const [avatarUrl, setAvatarUrl] = useState('')
    const [loaded, setLoaded] = useState(true)

    const {avatars} = useFirestore('avatars')
    const {images} = useFirestore('images')

    const userAvatars = avatars.filter(avatar => avatar.userId === props.userId)
    const userImages = images.filter(image => image.userId === props.userId)

    //Sets user avatar
    useEffect(() => {
        if (userAvatars.length === 1) {
            setAvatarUrl(userAvatars[0].url)
            //'Else if' checks if the elements have the timestamp set,
            // then sorts and deletes the previous avatar
        } else if (userAvatars.length > 1) {
            if (userAvatars.every(element => element.createdAt)) {
                userAvatars.sort((a, b) => b.createdAt - a.createdAt)
                setAvatarUrl(userAvatars[0].url)
                deleteFirebaseElement(
                    'Avatars/',
                    userAvatars[1].name,
                    'avatars',
                    userAvatars[1].id
                )
            }
        }
    }, [avatars, userAvatars])

    const handleImageLoad = () => {
        setLoaded(true)
    }

    return (
        <ProfileWrapper
            variants={props.containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <UserWrapper>
                <div className='avatar'>
                    <img
                        src={Avatar}
                        alt='default-avatar'
                        className='defaultAvatar'
                    />
                    {
                        avatarUrl &&
                         <img
                             src={avatarUrl}
                             alt='avatar'
                             className='customAvatar'
                             onLoad={handleImageLoad}
                         />
                    }

                    {
                        !loaded && (
                            <div className='imageOverlay'>
                                <Loader/>
                            </div>
                        )
                    }
                </div>
                <div className='userData'>
                    <UserName/>
                    <div className='email'>{props.email}</div>
                    <UploadFile
                        name={false}
                        folder='Avatars/'
                        collection='avatars'
                        userId={props.userId}
                        setLoaded={setLoaded}
                    />
                </div>

            </UserWrapper>

            <PostsWrapper>
                <div className='label'>My Posts</div>
                {
                    images &&
                    <UserImages
                        images={userImages}
                    />
                }
            </PostsWrapper>
        </ProfileWrapper>
    )
}

function mapStateToProps(state) {
    return {
        userId: state.authentication.userId,
        email: state.authentication.email
    }
}

export default connect(mapStateToProps)(Profile);