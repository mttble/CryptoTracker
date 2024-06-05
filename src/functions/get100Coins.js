import axios from "axios";

export const get100Coins = () => {
  const cachedCoins = localStorage.getItem("cachedCoins");
  const cachedTime = localStorage.getItem("cachedTime");

  const currentTime = new Date().getTime();
  const tenMinutesInMs = 15 * 60 * 1000; // 15 minutes in milliseconds

  if (cachedCoins && cachedTime && currentTime - parseInt(cachedTime, 10) < tenMinutesInMs) {
    // Use cached data if not expired
    console.log("Using cached data...");
    return Promise.resolve(JSON.parse(cachedCoins));
  } else {
    // Fetch fresh data
    console.log("Fetching fresh data...");
    return axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        localStorage.setItem("cachedCoins", JSON.stringify(response.data));
        localStorage.setItem("cachedTime", currentTime);
        console.log("Fresh data fetched and cached.");
        return response.data;
      })
      .catch((error) => {
        console.log("ERROR:", error.message);
      });
  }
};
