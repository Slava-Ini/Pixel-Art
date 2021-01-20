import React, {useRef, useState} from 'react'
import {projectFirestore} from '../../../firebase/config'
import {connect} from 'react-redux'
import {changeUserName} from '../../../redux/actions/authActions'
import styled from 'styled-components'
import Edit from '../../../images/tools/Draw.svg'

const UserNameWrapper = styled.div`
  position: relative;
  width: 70%;
  
  input {
    text-overflow: ellipsis;
    z-index: 200;
    padding: 0;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-size: 1.4vw;
    border: none;
    text-align: center;
    background: none;
    outline: none;
    cursor: pointer;
    
    &:focus {
      background: white;
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.25);
    }
  }
  
  .edit {
    cursor: pointer;
    z-index: 50;  
    top: 0.5vh;
    right: -2.5vh;
    position: absolute;
    height: 2vh;
  }
`
const UserName = (props) => {

    const [userName, setUserName] = useState(props.userName)

    const inputRef = useRef(null)

    const collection = projectFirestore.collection('users')
    let user = {}

    const changeNameHandler = () => {
            collection.get()
                .then(snap => {
                    snap.forEach(doc => {
                        if (doc.data().userId === props.userId) {
                            user = projectFirestore.collection('users').doc(doc.id)
                        }
                    })
                })
                .then(() => user.set({userName: userName}, {merge: true}))
                .then(() => props.changeName(userName))
    }
    const changeInputHandler = event => {
        setUserName(event.target.value)
    }
    const handleImageClick = () => {
        inputRef.current.focus()
    }

    return (
        <UserNameWrapper>
            <input
                type='text'
                defaultValue={userName}
                onChange={changeInputHandler}
                onBlur={changeNameHandler}
                ref={inputRef}
            />
            <img
                onClick={handleImageClick}
                className='edit'
                src={Edit}
                alt='edit'
            />
        </UserNameWrapper>
    )
}

function mapStateToProps(state) {
    return {
        userName: state.authentication.userName,
        userId: state.authentication.userId,
        token: state.authentication.token,
        email: state.authentication.email
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeName: (userName) => dispatch(changeUserName(userName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserName);