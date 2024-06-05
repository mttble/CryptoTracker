import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs/tabs';
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import { get100Coins } from '../functions/get100Coins'; // Import the get100Coins function

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedcoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }

  var filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    // Call the get100Coins function to fetch coins data
    get100Coins()
      .then((coinsData) => {
        setCoins(coinsData);
        setPaginatedCoins(coinsData.slice((page - 1) * 10, page * 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching coins data:', error);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedcoins} />
          {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} />}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
