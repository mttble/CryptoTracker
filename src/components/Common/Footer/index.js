import React from 'react'
import './styles.css'

function Footer() {
  return (
    <div className='footer'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <strong>CryptoTracker</strong> · Professional crypto market dashboard
        </div>
        <div style={{ opacity: 0.8 }}>
          Data by CoinGecko · Charts by Recharts
        </div>
      </div>
    </div>
  )
}

export default Footer
