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

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  
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
        setCoins(JSON.parse(cachedCoins));
        return;
      }
    }

    // Fetch new data from the API
    axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    )
    .then((response) => {
      console.log("response", response);
      setCoins(response.data);
      // Store response data and current time in localStorage
      localStorage.setItem('coins', JSON.stringify(response.data));
      localStorage.setItem('coinsTime', new Date().getTime());
    })
    .catch((error) => {
      console.log("error", error);
    });
  }, []);

  return (
    <div>
      <Header />
      <TabsComponent coins={coins}/>
    </div>
  );
}

export default DashboardPage;

