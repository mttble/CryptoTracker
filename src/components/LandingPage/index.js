import React from 'react'
import './styles.css'
import Button from '../Common/Button'
import iphone from '../../assets/iphone.png'
import gradient from '../../assets/gradient.png'
import {motion} from "framer-motion"

function MainComponent() {
  return (
    <div className='flex-info'>
        <div className='left-component'>
            <h1 className='track-crypto-heading'>Track Crypto</h1>
            <h1 className='real-time-heading'>Real Time.</h1>
            <p className='info-text'>
                Track Crypto through a public API in real time. Visit the dashboard to do so!
            </p>
            <div className='btn-flex'>
                <Button text={'Dashboard'} to="/dashboard" />
                <Button text={"Share"} outlined={true} />
            </div>
        </div>
        <div className='phone-container'>
            <motion.img src={iphone} className='iphone' initial={{ y:-10 }} animate={{ y:10 }} transition={{type:"smooth", repeatType: "mirror", duration: 2, repeat:Infinity,}}/>
            <img src={gradient} className='gradient'/>
        </div>
    </div>
  )
}

export default MainComponent
