// import React, { useEffect, useState } from 'react'
// import Header from '../components/Common/Header'
// import TabsComponent from '../components/Dashboard/Tabs/tabs'
// import axios from 'axios'

// function DashboardPage() {

//     const [coins, setCoins] = useState([])

//     useEffect(() => {
//         axios.get(
//             "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
//         )
//         .then((response) => {
//             console.log("response", response)
//             setCoins(response.data)
//         })
//         .catch((error) => {
//             console.log("error", error)
//         })
//     }, [])

//     return (
//         <div>
//         <Header />
//         <TabsComponent coins={coins}/>
//         </div>
//   )
// }

// export default DashboardPage

import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs/tabs';
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedcoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const  handlePageChange = (event, value) => {
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
  const cachedCoins = localStorage.getItem('coins');
  const cachedTime = localStorage.getItem('coinsTime');

  // Check if cached data is available and not expired
  if (cachedCoins && cachedTime) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - parseInt(cachedTime, 10);
    const tenMinutesInMs = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (timeDiff < tenMinutesInMs) {
      // Use cached data
      const coinsData = JSON.parse(cachedCoins);
      setCoins(coinsData);
      setPaginatedCoins(coinsData.slice((page - 1) * 10, page * 10));
      return;
    }
  }

  axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  )
  .then((response) => {
    console.log("response", response);
    setCoins(response.data);
    setPaginatedCoins(response.data.slice((page - 1) * 10, page * 10));
    localStorage.setItem('coins', JSON.stringify(response.data));
    localStorage.setItem('coinsTime', new Date().getTime());
  })
  .catch((error) => {
    console.log("error", error);
  });
}, [page]);

  return (
    <div>
      <Header />
      <Search search={search} onSearchChange={onSearchChange}/>
      <TabsComponent coins={search ? filteredCoins : paginatedcoins}/>
      {!search && <PaginationComponent page={page} handlePageChange={handlePageChange}/> }
    </div>
  );
}

export default DashboardPage;

