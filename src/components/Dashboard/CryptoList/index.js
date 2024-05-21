import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';

function CyptoList({ coin }) {
  return (
    <tr className='list-row'>
        <Tooltip title="Coin Image" placement="top">
        <td className='td-image'>
            <img src={coin.image} alt={coin.name} className='coin-logo'/>
        </td>
        </Tooltip>
        <Tooltip title="Coin" placement="top-start">
        <td>
            <div className='name-col'>
                <p className='coin-symbol td-shrink'>{coin.symbol}</p>
                <p className='coin-name td-shrink'>{coin.name}</p>
            </div>
        </td>
        </Tooltip>
        {coin.price_change_percentage_24h > 0 ? (
        <Tooltip title="Price Change 24h" placement="top">
        <td className='chip-flex'>
            <div className='price-chip td-shrink'>
                {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='icon-chip td-icon'>
                <TrendingUpRoundedIcon/>
            </div>
        </td>
        </Tooltip>
        ) : (
        <Tooltip title="Price Change 24h" placement="top-start">
        <td className='chip-flex'>
            <div className='price-chip chip-red td-shrink'>
                {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='icon-chip icon-chip-red td-icon'>
                <TrendingDownRoundedIcon/>
            </div>
        </td>
        </Tooltip>
        )}
        <Tooltip title="Current Price" placement="top">
        <td>
            <h3 className='coin-price td-center-align td-shrink' 
            style={{
                color:
                    coin.price_change_percentage_24h < 0 
                    ? "var(--red)" 
                    : "var(--green)"
                }}
            >
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 })}
            </h3>
        </td>
        </Tooltip>
        <Tooltip title="24h Volume" placement="top-end">
        <td>
            <p className='total_volume td-right-align td-shrink'>{coin.total_volume.toLocaleString()}</p>
        </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="top-end">
        <td>
            <p className='total_volume td-right-align td-shrink'>{coin.market_cap.toLocaleString()}</p>
        </td>
        </Tooltip>
    
    </tr>
  )
}

export default CyptoList