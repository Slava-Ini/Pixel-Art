import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {motion, AnimateSharedLayout} from 'framer-motion'
import {useLocation} from 'react-router'


const Navbar = styled.div`
  width: 40%;
  max-height: 30%;
  min-height: 13%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  li {
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-size: 160%;
    font-weight: lighter;
    list-style: none;
  }
  
  li a {
    text-decoration: none;
    color: #000000;
  }
  
  li a:hover {
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  
`

const Underline = styled(motion.div)`
  position: absolute;
  background-color: #B41616;
  height: 2px;
  width: 100%;
  bottom: 0;
`

const MenuBar = (props) => {

    const links = [
        {id: 1, to: '/', label: 'Home', exact: true},
        {id: 2, to: '/redactor', label: 'Editor', exact: false},
        {id: 3, to: '/gallery', label: 'Gallery', exact: false},
    ]

    if (props.isAuthenticated) {
        links.push({id: 6, to: '/profile', label: 'Profile', exact: false})
        links.push({id: 5, to: '/logout', label: 'Log out', exact: false})
    } else {
        links.push({id: 4, to: '/authentication', label: 'Log in', exact: false})
    }


    const location = useLocation()

    const renderCurrentLink = (link) => {
        let isActive = false
        location.pathname === link.to ? isActive = true : isActive = false

        return (
            <React.Fragment>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                >
                    {link.label}
                </NavLink>
                {
                    isActive &&
                    <Underline
                        layoutId='underline'
                        className='underline'
                        transition={{ ease: "easeOut", duration: 0.3 }}
                    />
                }
            </React.Fragment>
        )
    }

    const renderLinks = (links) => {
        return links.map((link) => {
            return (
                <li key={link.id}>
                    {renderCurrentLink(link)}
                </li>
            )
        })
    }

    return (
        <Navbar>
            <AnimateSharedLayout>
                {renderLinks(links)}
            </AnimateSharedLayout>
        </Navbar>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.token
    }
}

export default connect(mapStateToProps)(MenuBar)