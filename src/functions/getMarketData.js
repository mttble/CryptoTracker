import axios from 'axios';

export async function getGlobalMarketData(vsCurrency = 'usd') {
  // Coingecko "global" endpoint does not support vs_currency, but we still pass for extension
  const { data } = await axios.get('https://api.coingecko.com/api/v3/global');
  return {
    activeCryptocurrencies: data?.data?.active_cryptocurrencies,
    markets: data?.data?.markets,
    dominance: data?.data?.market_cap_percentage,
    marketCapChange24h: data?.data?.market_cap_change_percentage_24h_usd,
    totalMarketCap: data?.data?.total_market_cap?.[vsCurrency] || data?.data?.total_market_cap?.usd,
    totalVolume: data?.data?.total_volume?.[vsCurrency] || data?.data?.total_volume?.usd,
  };
}

export async function getCoinHistory(coinId, vsCurrency = 'usd', days = 7) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`;
  const { data } = await axios.get(url);
  return data; // { prices: [[ts, price], ...], market_caps: ..., total_volumes: ... }
}

export async function getCoinDetails(coinId) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
  const { data } = await axios.get(url);
  return data;
}
