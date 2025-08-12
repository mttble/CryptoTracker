import React, { useEffect, useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { getGlobalMarketData } from '../../functions/getMarketData';

export default function MarketOverviewBar() {
  const { currency, symbol } = useCurrency();
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    getGlobalMarketData(currency).then(setGlobal).catch(() => {});
  }, [currency]);

  if (!global) return null;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px',
      background: 'var(--darkgrey)',
      borderRadius: 12,
      margin: '12px 0',
      fontSize: 14,
    }}>
      <div><strong>Market Cap:</strong> {symbol}{global.totalMarketCap?.toLocaleString()}</div>
      <div><strong>24h Vol:</strong> {symbol}{global.totalVolume?.toLocaleString()}</div>
      <div><strong>BTC Dom:</strong> {global.dominance?.btc?.toFixed(1)}%</div>
      <div><strong>Coins:</strong> {global.activeCryptocurrencies}</div>
    </div>
  );
}
