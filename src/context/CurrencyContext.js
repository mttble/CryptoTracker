import React, { createContext, useContext, useMemo, useState } from 'react';

const DEFAULT_CURRENCY = 'usd';

const currencyCodeToSymbol = {
  usd: '$',
  eur: '€',
  gbp: '£',
  jpy: '¥',
  aud: 'A$',
  cad: 'C$',
  inr: '₹',
};

const CurrencyContext = createContext({
  currency: DEFAULT_CURRENCY,
  symbol: currencyCodeToSymbol[DEFAULT_CURRENCY],
  setCurrency: () => {},
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(
    (localStorage.getItem('currency') || DEFAULT_CURRENCY).toLowerCase()
  );

  const value = useMemo(() => {
    const code = (currency || DEFAULT_CURRENCY).toLowerCase();
    const symbol = currencyCodeToSymbol[code] || '$';
    localStorage.setItem('currency', code);
    return { currency: code, symbol, setCurrency };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function getCurrencySymbol(code) {
  return currencyCodeToSymbol[(code || '').toLowerCase()] || '$';
}
