import React, {useMemo, useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, List, ThemeProvider } from '@mui/material';
import Grid from '../Grid';
import './styles.css';
import CryptoList from '../CryptoList';

export default function TabsComponent({ coins, currentPage, itemsPerPage }) {
  const [value, setValue] = useState('grid');
  const [sort, setSort] = useState('market_cap_desc');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3a80e9',
      },
    },
  })

  const style = {
    color: 'var(--white)',
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  }

  const sortedCoins = useMemo(() => {
    const list = [...coins];
    switch (sort) {
      case 'price_asc':
        return list.sort((a,b)=> a.current_price - b.current_price);
      case 'price_desc':
        return list.sort((a,b)=> b.current_price - a.current_price);
      case 'change_desc':
        return list.sort((a,b)=> (b.price_change_percentage_24h||0) - (a.price_change_percentage_24h||0));
      case 'change_asc':
        return list.sort((a,b)=> (a.price_change_percentage_24h||0) - (b.price_change_percentage_24h||0));
      case 'market_cap_asc':
        return list.sort((a,b)=> a.market_cap - b.market_cap);
      case 'market_cap_desc':
      default:
        return list.sort((a,b)=> b.market_cap - a.market_cap);
    }
  }, [coins, sort]);
  
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant='fullWidth'>
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, padding: '0 12px' }}>
          <select
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
            style={{
              background: 'transparent', color: 'var(--white)', border: '1px solid var(--blue)',
              borderRadius: 8, padding: '6px 10px', outline: 'none'
            }}
          >
            <option style={{ color: 'black' }} value="market_cap_desc">Market Cap ↓</option>
            <option style={{ color: 'black' }} value="market_cap_asc">Market Cap ↑</option>
            <option style={{ color: 'black' }} value="price_desc">Price ↓</option>
            <option style={{ color: 'black' }} value="price_asc">Price ↑</option>
            <option style={{ color: 'black' }} value="change_desc">24h Change ↓</option>
            <option style={{ color: 'black' }} value="change_asc">24h Change ↑</option>
          </select>
        </div>
        <TabPanel value="grid">
          <div className='grid-flex'>
            {sortedCoins.map((coin, i) => {
              return <Grid coin={coin} rank={coin.originalIndex + 1} key={i} />
            })}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className='list-table'>
            {sortedCoins.map((coin, i) => {
              return <CryptoList coin={coin} rank={coin.originalIndex + 1} key={i} />
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
