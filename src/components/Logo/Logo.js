import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.svg'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
    <Tilt tiltMaxAngleX={55}>
        <div className='tilt br2 shadow-2' style={{ height: '150px', width: '150px'}}>
            <div className='pa3'>
              {/* 👽 */}
              <img style={{padding: '5px'}} src={brain} alt='logo' />
            </div>
        </div>
    </Tilt>
    </div>
  )
}

export default Logo