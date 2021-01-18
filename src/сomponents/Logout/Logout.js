import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/authActions'
import {Redirect} from 'react-router'

const Logout = (props) => {

    useEffect(() => {
        props.logout()
    }, [props])

    return (
        <Redirect to={'/'} />
    )
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)