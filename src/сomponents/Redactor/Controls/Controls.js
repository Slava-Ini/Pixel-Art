import React from 'react'
import Save from '../../../images/controls/Save.svg'
import Load from '../../../images/controls/Load.svg'
import SaveMiniature from '../../../images/controls/Save Miniature.svg'
import Grid from '../../../images/controls/Grid.svg'
import Clear from '../../../images/controls/Clear.svg'
import ControlButton from '../../UI/Editor/ControlButton'
import Undo from '../../../images/controls/Undo.svg'
import styled from 'styled-components'
import UploadToGallery from '../UploadToGallery/UploadToGallery'
import TipsButton from '../../UI/Tips/TipsButton'


const ControlsPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: 11vh;
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

const Controls = (props) => {
    return (
        <ControlsPanel>
            <ControlButton
                name={'Undo'}
                src={Undo}
            />
            <ControlButton
                name={'Clear'}
                src={Clear}
            />
            <ControlButton
                name={'Grid'}
                src={Grid}
            />
            <ControlButton
                name={'Save'}
                src={Save}
            />
            <ControlButton
                name={'Save Miniature'}
                src={SaveMiniature}
            />
            <ControlButton
                name={'Load'}
                src={Load}
            />
            <UploadToGallery
                name={'Load'}
                src={Load}
            />
            <TipsButton
                displayName={true}
            />
        </ControlsPanel>
    )
}

export default Controls