import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs/tabs';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import { get100Coins } from '../functions/get100Coins'; // Import the get100Coins function
import { useCurrency } from '../context/CurrencyContext';
import { getGlobalMarketData } from '../functions/getMarketData';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedcoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [global, setGlobal] = useState(null);
  const itemsPerPage = 25; // Define items per page
  const { currency, symbol } = useCurrency();

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * itemsPerPage;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + itemsPerPage));
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  var filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    get100Coins(currency)
      .then((coinsData) => {
        const coinsDataWithIndex = coinsData.map((coin, index) => ({ ...coin, originalIndex: index }));
        setCoins(coinsDataWithIndex);
        setPaginatedCoins(coinsDataWithIndex.slice((page - 1) * itemsPerPage, page * itemsPerPage));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching coins data:', error);
        setIsLoading(false);
      });
  }, [page, currency]);

  useEffect(() => {
    // fetch global market data
    getGlobalMarketData(currency)
      .then(setGlobal)
      .catch(() => {});
  }, [currency]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {global && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--darkgrey)',
              borderRadius: 12,
              margin: '16px',
            }}>
              <div>
                <strong>Global Market Cap:</strong> {symbol}{global.totalMarketCap?.toLocaleString()}
              </div>
              <div>
                <strong>24h Volume:</strong> {symbol}{global.totalVolume?.toLocaleString()}
              </div>
              <div>
                <strong>BTC Dominance:</strong> {global.dominance?.btc?.toFixed(1)}%
              </div>
              <div>
                <strong>Active Coins:</strong> {global.activeCryptocurrencies}
              </div>
            </div>
          )}
          <Search search={search} onSearchChange={onSearchChange} />
          {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} />}
          <TabsComponent coins={search ? filteredCoins : paginatedcoins} currentPage={page} itemsPerPage={itemsPerPage} />
          {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} />}
        </div>
      )}
    </>
  );
}

export default DashboardPage;