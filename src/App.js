import React, {useEffect} from 'react'
import MenuBar from './сomponents/Navigation/MenuBar/MenuBar'
import Redactor from './сomponents/Redactor/Redactor'
import {Redirect, Route, Switch, withRouter} from 'react-router'
import Gallery from './сomponents/Gallery/Gallery'
import Home from './сomponents/Home/Home'
import Auth from './сomponents/Authentication/Auth'
import {connect} from 'react-redux'
import {autoLogin} from './redux/actions/authActions'
import Logout from './сomponents/Logout/Logout'
import Profile from './сomponents/Profile/Profile'
import styled from 'styled-components'
import {AnimatePresence} from 'framer-motion'
import './App.css'

const AppWrapper = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  >div:first-child {
    height: 13%;
  }
`

function App(props) {

    const autoLogin = props.autoLogin
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {delay: 0.2, duration: 0.2}
        },
        exit: {
            opacity: 0,
            transition: {duration: 0.2}
        }
    }


    // Auto login
    useEffect(() => {
        autoLogin()
    }, [props.isAuthenticated, autoLogin])

    let routes = (
        <React.Fragment>
            <MenuBar/>
            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route exact path='/'>
                        <Home containerVariants={containerVariants}/>
                    </Route>
                    <Route path='/redactor'>
                        <Redactor containerVariants={containerVariants}/>
                    </Route>
                    <Route path='/gallery'>
                        <Gallery containerVariants={containerVariants}/>
                    </Route>
                    <Route path='/authentication'>
                        <Auth containerVariants={containerVariants}/>
                    </Route>
                    <Redirect to={'/profile'}/>
                </Switch>
            </AnimatePresence>
        </React.Fragment>
    )
    if (props.isAuthenticated) {
        routes = (
            <React.Fragment>
                <MenuBar/>
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        <Route exact path='/'>
                            <Home containerVariants={containerVariants}/>
                        </Route>
                        <Route path='/redactor'>
                            <Redactor containerVariants={containerVariants}/>
                        </Route>
                        <Route path='/gallery'>
                            <Gallery containerVariants={containerVariants}/>
                        </Route>
                        <Route path='/profile'>
                            <Profile containerVariants={containerVariants}/>
                        </Route>
                        <Route path='/logout' component={Logout}/>
                        <Redirect to={'/profile'}/>
                    </Switch>
                </AnimatePresence>
            </React.Fragment>
        )
    }

    return (
        <AppWrapper id='app'>
            {routes}
        </AppWrapper>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.authentication.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
