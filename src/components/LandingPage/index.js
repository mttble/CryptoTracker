import React from 'react';
import './styles.css';
import Button from '../Common/Button';
import iphone from '../../assets/iphone.png';
import gradient from '../../assets/gradient.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainComponent() {
    
    function copyToClipboard() {
        const url = 'https://crypto-tracker-seven-liard.vercel.app/';
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('URL copied to clipboard');
                toast.success('URL copied to clipboard!', {
                    autoClose: 1000,
                    transition: Slide,
                    position: "bottom-right"
                });
            })
            .catch(err => {
                console.error('Failed to copy URL:', err);
                toast.error('Failed to copy URL.', {
                    autoClose: 1000,
                    transition: Slide,
                    position: "bottom-right"
                });
            });
    }

    return (
        <div className='flex-info'>
            <ToastContainer position="bottom-right" />
            <div className='left-component'>
                <h1 className='track-crypto-heading'>Track Crypto</h1>
                <h1 className='real-time-heading'>Real Time.</h1>
                <p className='info-text'>
                    Track Crypto through a public API in real time. Visit the dashboard to do so!
                </p>
                <div className='btn-flex'>
                    <Link to="/dashboard">
                        <Button text={'Dashboard'} />
                    </Link>
                    <Button text={"Share"} outlined={true} onClick={copyToClipboard} />
                </div>
            </div>
            <div className='phone-container'>
                <motion.img src={iphone} className='iphone' initial={{ y: -10 }} animate={{ y: 10 }} transition={{ type: "smooth", repeatType: "mirror", duration: 2, repeat: Infinity, }} />
                <img src={gradient} className='gradient' />
            </div>
        </div>
    );
}

export default MainComponent;
