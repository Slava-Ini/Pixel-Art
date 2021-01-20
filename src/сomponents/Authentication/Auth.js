import React from 'react'
import useForm from '../../hooks/useForm'
import validate from '../../validation/validateLogin'
import {connect} from 'react-redux'
import {auth} from '../../redux/actions/authActions'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const AuthWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  max-width: 40rem;
  height: 40vh;
  min-height: 20rem;
  margin-top: 5%;
  background: rgba(227, 245, 241, 0.85);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  
  form {
    width: 55%;
  }
  
  .inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
    
    label {
      margin-bottom: 2%;
      font-weight: 300;
      font-size: 20px;
    }
    
    input {
      padding-left: 5%;
      padding-right: 5%;
      border: none;
      outline: none;
      background-color: white;
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.25);
      height: 2.5em;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 20px;
      box-sizing: border-box;
    }
  }
  
  .email, .password {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .email input {
    border: ${props => props.errorsEmail ? '1px solid #B41616' : 'none'};
  }
  
  .password input {
    border: ${props => props.errorsPassword ? '1px solid #B41616' : 'none'};
  }
  
  .password {
    margin-top: 10%;
  }
  
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10%;
      
    button {
      width: 40%;
      height: 3em;
      border: none;
      outline: none;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 18px;
      
      &:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
        transition: box-shadow 0.1s linear;
        cursor: ${props => props.errorsPassword || props.errorsEmail ? 'not-allowed' : 'pointer'};
      }
      
      &:active {
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.25);
      }
    }
    
    .buttonLogin {
      background: #81FFB3;
    }
    
    .buttonRegister {
      background: #A9F0FF;
    }
  }
  
  .errorEmail, .errorPassword {
    position: absolute;
    height: 2vh;
    top: 90%;
    color: #B41616;
    font-weight: 300;
    font-size: 1.6vh;
  }
    
`
const Auth = (props) => {

    const {handleChange, handleSubmit, values, errors, disabled} = useForm(validate)

    const loginHandler = () => {
        props.auth(values.email, values.password, true)
    }

    const registerHandler = () => {
        props.auth(values.email, values.password, false)
    }

    return (
        <AuthWrapper
            errorsEmail={errors.email}
            errorsPassword={errors.password}
            variants = {props.containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form
                onSubmit={handleSubmit}
            >
                <div className='inputs'>
                    <div className='email'>
                        <label>Email</label>
                        <input
                            name='email'
                            type='email'
                            value={values.email}
                            onChange={handleChange}
                        />
                        <div className='errorEmail'>
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                    </div>


                    <div className='password'>
                        <label>Password</label>
                        <input
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                        />
                        <div className='errorPassword'>
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                    </div>
                </div>

                <div className='buttons'>
                    <button
                        className='buttonLogin'
                        type='submit'
                        disabled={disabled}
                        onClick={loginHandler}
                    >
                        Log in
                    </button>
                    <button
                        className='buttonRegister'
                        type='submit'
                        disabled={disabled}
                        onClick={registerHandler}
                    >
                        Register
                    </button>
                </div>
            </form>
        </AuthWrapper>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)