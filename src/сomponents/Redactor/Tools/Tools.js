import React from 'react'
import Draw from '../../../images/tools/Draw.svg'
import Fill from '../../../images/tools/Bucket.svg'
import Circle from '../../../images/tools/Circle.svg'
import Rectangle from '../../../images/tools/Rectangle.svg'
import Pick from '../../../images/tools/Pick.svg'
import Line from '../../../images/tools/Line.svg'
import Lighten from '../../../images/tools/Lighten.svg'
import Darken from '../../../images/tools/Darken.svg'
import styled from 'styled-components'
import ToolButton from '../../UI/Editor/ToolButton'
import {AnimateSharedLayout} from 'framer-motion'

const ToolsPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: 8.5%;
    background: rgba(227, 245, 241, 0.85);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    
    >button:first-child {
      margin-top: 10%;
    }
    
    >button {
      height: 12.5%;
    }
`

const Tools = () => {
    return (
        <React.Fragment>
            <ToolsPanel>
                <AnimateSharedLayout>
                    <ToolButton
                        name={'draw'}
                        src={Draw}
                    />
                    <ToolButton
                        name={'fill'}
                        src={Fill}
                    />
                    <ToolButton
                        name={'circle'}
                        src={Circle}
                    />
                    <ToolButton
                        name={'rectangle'}
                        src={Rectangle}
                    />
                    <ToolButton
                        name={'pick'}
                        src={Pick}
                    />
                    <ToolButton
                        name={'line'}
                        src={Line}
                    />
                    <ToolButton
                        name={'lighten'}
                        src={Lighten}
                    />
                    <ToolButton
                        name={'darken'}
                        src={Darken}
                    />
                </AnimateSharedLayout>
            </ToolsPanel>
        </React.Fragment>
    )
}

export default Tools