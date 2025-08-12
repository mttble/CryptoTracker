import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Common/Header';
import { useSearchParams } from 'react-router-dom';
import { getCoinDetails, getCoinHistory } from '../functions/getMarketData';
import { useCurrency } from '../context/CurrencyContext';
import Loader from '../components/Common/Loader';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

function CoinPage() {
  const [params] = useSearchParams();
  const coinId = params.get('id');
  const { currency, symbol } = useCurrency();
  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (!coinId) return;
    setIsLoading(true);
    Promise.all([
      getCoinDetails(coinId),
      getCoinHistory(coinId, currency, days),
    ])
      .then(([details, hist]) => {
        setCoin(details);
        setHistory(hist);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [coinId, currency, days]);

  const chartData = useMemo(() => {
    if (!history?.prices) return [];
    return history.prices.map(([ts, price]) => ({
      time: new Date(ts).toLocaleDateString(),
      price,
    }));
  }, [history]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img src={coin?.image?.small} alt={coin?.name} width={40} height={40} />
            <h2 style={{ margin: 0 }}>{coin?.name} ({coin?.symbol?.toUpperCase()})</h2>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {[1, 7, 30, 90, 180, 365].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  style={{
                    background: days === d ? 'var(--blue)' : 'transparent',
                    color: 'var(--white)',
                    border: '1px solid var(--blue)',
                    borderRadius: 8,
                    padding: '6px 10px',
                    cursor: 'pointer',
                  }}
                >
                  {d === 1 ? '24H' : `${d}D`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <div style={{ height: 300, background: 'var(--darkgrey)', borderRadius: 12, padding: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" hide={chartData.length > 50} tick={{ fill: '#aaa', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#aaa', fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} formatter={(value) => `${symbol}${Number(value).toLocaleString()}`} />
                  <Line type="monotone" dataKey="price" stroke="#3a80e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: 'var(--darkgrey)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                <div><strong>Price:</strong> {symbol}{coin?.market_data?.current_price?.[currency]?.toLocaleString?.()}</div>
                <div><strong>Market Cap:</strong> {symbol}{coin?.market_data?.market_cap?.[currency]?.toLocaleString?.()}</div>
                <div><strong>24h Change:</strong> {coin?.market_data?.price_change_percentage_24h?.toFixed?.(2)}%</div>
                <div><strong>Circulating Supply:</strong> {coin?.market_data?.circulating_supply?.toLocaleString?.()}</div>
                <div><strong>Max Supply:</strong> {coin?.market_data?.max_supply?.toLocaleString?.() || '—'}</div>
              </div>
            </div>

            {coin?.description?.en && (
              <div style={{ background: 'var(--darkgrey)', borderRadius: 12, padding: 16 }}>
                <h3>About</h3>
                <div
                  style={{ color: 'var(--grey)' }}
                  dangerouslySetInnerHTML={{
                    __html: coin.description.en.split('\n')[0],
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinPage;
