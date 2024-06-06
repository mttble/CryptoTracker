import React, { useState } from "react";
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";


function CryptoList({ coin, rank }) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
    return (
        <tr className='list-row'>
            <p className='coin-rank'>{rank}</p>
            <Tooltip title="Coin Image" placement="top">
            <td className='td-image'>
                <img src={coin.image} alt={coin.name} className='coin-logo'/>
            </td>
            </Tooltip>
            <Tooltip title="Coin" placement="top-start">
            <td>
                <div className='name-col-list'>
                    <p className='coin-symbol td-shrink-list'>{coin.symbol}</p>
                    <p className='coin-name td-shrink-list'>{coin.name}</p>
                </div>
            </td>
            </Tooltip>
            {coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="Price Change 24h" placement="top">
            <td className='chip-flex-list'>
                <div className='price-chip-list td-shrink-list'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip td-icon'>
                    <TrendingUpRoundedIcon/>
                </div>
            </td>
            </Tooltip>
            ) : (
            <Tooltip title="Price Change 24h" placement="top-start">
            <td className='chip-flex-list'>
                <div className='price-chip-list chip-red td-shrink-list'>
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
                <h3 className='coin-price td-center-align td-shrink-list' 
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
            <td className='desktop-td-mkt'>
                <p className='total_volume td-right-align td-shrink-list'>{coin.total_volume.toLocaleString()}</p>
            </td>
            </Tooltip>
            <Tooltip title="24h Volume" placement="top-end">
            <td className='mobile-td-mkt'>
                <p className='total_volume td-right-align td-shrink-list'>{convertNumber(coin.total_volume)}</p>
            </td>
            </Tooltip>

            <Tooltip title="Market Cap" placement="top-end">
            <td className='desktop-td-mkt'>
                <p className='total_volume td-right-align td-shrink-list'>{coin.market_cap.toLocaleString()}</p>
            </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement="top-end">
            <td className='mobile-td-mkt'>
                <p className='total_volume td-right-align td-shrink-list'>{convertNumber(coin.market_cap)}</p>
            </td>
            </Tooltip>
            <td
            className={`watchlist-icon-list ${
                coin.price_change_percentage_24h < 0 && "watchlist-icon-list-red"
            }`}
            onClick={(e) => {
                if (isCoinAdded) {
                // remove coin
                removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                } else {
                setIsCoinAdded(true);
                saveItemToWatchlist(e, coin.id);
                }
            }}
            >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
            </td>
        
        </tr>
    )
}

export default CryptoList