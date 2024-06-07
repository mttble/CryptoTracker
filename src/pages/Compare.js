import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import { get100Coins } from '../functions/get100Coins';
import Loader from '../components/Common/Loader';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery'


function ComparePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoin1, setSelectedCoin1] = useState('');
  const [selectedCoin2, setSelectedCoin2] = useState('');
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [multiplier, setMultiplier] = useState(null);
  const [showComparisonCard, setShowComparisonCard] = useState(false);

  const isExtraSmallScreen = useMediaQuery('(max-width:600px)');
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const handleSwitchCoins = () => {
    const tempCoin1 = selectedCoin1;
    const tempCoin1Data = coin1Data;
    setSelectedCoin1(selectedCoin2);
    setCoin1Data(coin2Data);
    setSelectedCoin2(tempCoin1);
    setCoin2Data(tempCoin1Data);
  };

  // Fetch coins data
  useEffect(() => {
    get100Coins()
      .then(coinsData => {
        const filteredCoins = coinsData.filter(coin => {
          return coin.id !== 'tether' && coin.id !== 'usd-coin' && coin.id !== 'first-digital-usd' && coin.id !== 'ethena-usde';
        });
        setCoins(filteredCoins);
        console.log('Coins data:', filteredCoins);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching coins data:', error);
        setIsLoading(false);
      });
  }, []);

  // Handler for selecting coin 1
  const handleSelectCoin1 = (event, value) => {
    setSelectedCoin1(value?.id || '');
    setCoin1Data(value);
  };

  // Handler for selecting coin 2
  const handleSelectCoin2 = (event, value) => {
    setSelectedCoin2(value?.id || '');
    setCoin2Data(value);
  };

  // Calculate price of coin 1 if it had the market cap of coin 2
  useEffect(() => {
    if (coin1Data && coin2Data) {
      const priceOfCoin1 = (coin2Data.market_cap / coin1Data.market_cap) * coin1Data.current_price;
      setCalculatedPrice(priceOfCoin1);
      if (coin1Data.current_price !== 0) {
        setMultiplier(priceOfCoin1 / coin1Data.current_price);
      }
      setShowComparisonCard(true);
    } else {
      setShowComparisonCard(false);
    }
  }, [coin1Data, coin2Data]);

  // Render comparison card
  const renderComparisonCard = (coinData) => {
    if (coinData) {
      return (
        <div className="comparison-card">
          <h2 style={{fontSize: isSmallScreen ? '1.2rem' : '2rem'}}>{coinData.name} ({coinData.symbol})</h2>
          <p style={{fontSize: isSmallScreen ? '1rem' : '1.5rem'}}>Market Cap: ${coinData.market_cap.toLocaleString()}</p>
          <p style={{fontSize: isSmallScreen ? '1rem' : '1.5rem'}}>Price: ${coinData.current_price.toLocaleString()}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  // Custom dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3A80E9', // Example primary color
      },
      secondary: {
        main: '#3A80E9', // Example secondary color
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="compare-page">
          <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Compare Cryptocurrencies</h1>
          <Box display="flex" justifyContent="center" gap={2} width="100%">
          <Autocomplete
            value={coin1Data}
            onChange={handleSelectCoin1}
            options={coins}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            sx={isSmallScreen ? { 
              width: '80%', 
              transform: 'scale(0.8)'
            } : { 
              width: '250px'
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Coin 1"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
                fullWidth
              />
            )}
          />
            <Button variant="contained" onClick={handleSwitchCoins}>Switch</Button>
            <Autocomplete
              value={coin2Data}
              onChange={handleSelectCoin2}
              options={coins}
              getOptionLabel={(option) => `${option.name} (${option.symbol})`}
              sx={isSmallScreen ? { 
                width: '80%', 
                transform: 'scale(0.8)'
              } : { 
                width: '250px'
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Coin 2"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                  fullWidth
                />
              )}
            />
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ paddingLeft:'10px' }} >{renderComparisonCard(coin1Data)}</div>
              <div style={{ paddingLeft:'10px' }} >{renderComparisonCard(coin2Data)}</div>
            </div>
          </div>
          {showComparisonCard && (
            <div className="comparison-card" style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2 style={{color: '#3A80E9', fontSize: isExtraSmallScreen ? '1.2rem' : '2rem'}}>{coin1Data?.name} with the Market Cap of {coin2Data?.name}</h2>
              <p style={{fontSize: isExtraSmallScreen ? '1rem' : '1.5rem'}}>Price: ${calculatedPrice?.toLocaleString()} ({multiplier?.toFixed(2)}x)</p>
            </div>
          )}
          </div>
      )}
    </ThemeProvider>
  );
}

export default ComparePage;
