import React from 'react'
import {CHANGE_TOOL} from '../../../redux/actions/actionTypes'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import OutlineImg from '../../../images/tools/Outline.svg'

const Button = styled.button`
     position: relative;
     flex-basis: 20%;
     border: none;
     background: none;
     box-sizing: border-box;
     outline: none;
     margin-bottom: 10%;

     img {
      width: 65%;
      height: auto;
     }
     
     &:hover {
        cursor: pointer;
        
        .toolName {
          visibility: visible;
          opacity: 1;
        }
        
        img:not(.outline) {
          filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
        }
     }
     
     img:not(.outline)  {
       filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
     }
     
     .toolName {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.2s, opacity 0.2s ease-in-out;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 85%;
        left: 0;
        right: 0;
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 1.6vh;
        color: #616060;
        z-index: 20;
     }
     
     .outline {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
        border: none;
        z-index: 15;
     }
`

const ToolButton = props => {

    let name = props.name

    const renderName = () => {
        switch (name) {
            case 'lighten':
                return (
                    <span className='toolName'>
                        <span>{name[0].toUpperCase() + name.slice(1) +  ' - '}</span>
                        <span style={{color: '#B41616'}}>J</span>
                    </span>
                )
            case 'darken':
                return (
                    <span className='toolName'>
                        <span>{name[0].toUpperCase() + name.slice(1) +  ' - '}</span>
                        <span style={{color: '#B41616'}}>K</span>
                    </span>
                )
            default :
                return (
                    <span className='toolName'>
                        <span>{name[0].toUpperCase() + name.slice(1) +  ' - '}</span>
                        <span style={{color: '#B41616'}}>{name[0].toUpperCase()}</span>
                    </span>
                )
        }
    }

    return (
        <Button
            onClick={() => props.click(props.name)}
            currentTool={props.currentTool}
            name={props.name}
        >
            <img
                src={props.src}
                alt={props.name}
            />
            {renderName()}
            {
                name === props.currentTool &&
                    <motion.div
                        layoutId='outline'
                        className='outline'
                        transition={{ ease: "easeOut", duration: 0.3 }}
                    >
                        <img
                            className='outline'
                            src={OutlineImg}
                            alt='outline'
                        />
                    </motion.div>
            }
        </Button>
    )
}

function mapStateToProps(state) {
    return {
        currentTool: state.canvas.currentTool
    }
}

function mapDispatchToProps(dispatch) {
    return {
        click: (payload) => dispatch({
            type: CHANGE_TOOL,
            payload: payload
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButton);
