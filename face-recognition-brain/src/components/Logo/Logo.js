import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{height: '150px', width: '150px'}}>
            <Tilt tiltReverse={true}>
                <div className='Tilt br2 shadow-2 pa3' style={{ height: '150px', width: '150px', backgroundColor: 'darkgreen' }}>
                    <img style={{paddingTop: '5px'}} src={brain} alt='Logo'/>
                </div>
            </Tilt>
            
        </div>
    )
}

export default Logo