import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT, CHANGE_USERNAME} from '../actions/actionTypes'
import {projectFirestore} from "../../firebase/config"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOrdls-D_texS-GjG6j4kkWgsyNdsxQHI'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOrdls-D_texS-GjG6j4kkWgsyNdsxQHI'
        }

        const response = await axios.post(url, authData)
        const data = response.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        //create new item in collection
        //and put user there if user is registering
        if(!isLogin) {
            const collectionRef = projectFirestore.collection('users')
            collectionRef.add({userId: data.localId, userName: email, email: email})
        }


        //put userName to localStorage for publishing picture
        projectFirestore.collection('users').get().then(
            snap => {
                snap.forEach(doc => {
                    if (doc.data().userId === data.localId) localStorage.setItem('userName', doc.data().userName)
                })
            }
        ).then(() => {
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('email', email)

            dispatch(authSuccess(data.idToken, localStorage.getItem('userName'), email, data.localId))
            dispatch(autoLogout(data.expiresIn))
        })



    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        const userName = localStorage.getItem('userName')
        const email = localStorage.getItem('email')
        const userId = localStorage.getItem('userId')

        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, userName, email, userId))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token, userName, email, userId) {
    return {
        type: AUTH_SUCCESS,
        token,
        userName,
        email,
        userId
    }
}

export function changeUserName (userName) {
    localStorage.setItem('userName', userName)
    return {
        type: CHANGE_USERNAME,
        userName
    }
}


