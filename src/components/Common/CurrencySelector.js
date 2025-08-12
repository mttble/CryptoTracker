import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const supported = [
  { code: 'usd', label: 'USD ($)' },
  { code: 'eur', label: 'EUR (€)' },
  { code: 'gbp', label: 'GBP (£)' },
  { code: 'inr', label: 'INR (₹)' },
  { code: 'jpy', label: 'JPY (¥)' },
  { code: 'aud', label: 'AUD (A$)' },
  { code: 'cad', label: 'CAD (C$)' },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      style={{
        background: 'transparent',
        color: 'var(--white)',
        border: '1px solid var(--blue)',
        borderRadius: 8,
        padding: '6px 10px',
        outline: 'none',
      }}
    >
      {supported.map((c) => (
        <option key={c.code} value={c.code} style={{ color: 'black' }}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
