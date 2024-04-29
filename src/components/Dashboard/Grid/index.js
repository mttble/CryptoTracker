import React from 'react'
import "./styles.css"

function Grid({ coin }) {
  return (
    <div className='grid-container'>
        <div className='info-flex'>
            <img src={coin.image} alt={coin.name} className='coin-logo'/>
            <div className='name-col'>
                <p className='coin-symbol'>{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
            </div>
        </div>
        <div className='chip-flex'>
            <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
        </div>
    </div>
  )
}

export default Grid