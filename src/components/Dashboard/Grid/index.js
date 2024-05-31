import React, { useState } from "react";
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Grid({ coin }) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
    return (
        <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
            <div
            className={`watchlist-icon ${
                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
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
        </div>
            <div className='info-flex'>
                <img src={coin.image} alt={coin.name} className='coin-logo'/>
                <div className='name-col'>
                    <p className='coin-symbol'>{coin.symbol}</p>
                    <p className='coin-name'>{coin.name}</p>
                </div>
            </div>
            {coin.price_change_percentage_24h > 0 ? (
            <div className='chip-flex'>
                <div className='price-chip-grid'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip'>
                    <TrendingUpRoundedIcon/>
                </div>
            </div>
            ) : (
            <div className='chip-flex'>
                <div className='price-chip-grid chip-red'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='icon-chip icon-chip-red'>
                    <TrendingDownRoundedIcon/>
                </div>
            </div>
            )}
            <div className='info-container'>
                <h3 className='coin-price' 
                style={{
                    color:
                        coin.price_change_percentage_24h < 0 
                        ? "var(--red)" 
                        : "var(--green)"
                    }}
                >
                            ${coin.current_price.toLocaleString()}
                </h3>
                <p className='total_volume'>Total Volume : {coin.total_volume.toLocaleString()}</p>
                <p className='total_volume'>Market Cap : {coin.market_cap.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default Grid