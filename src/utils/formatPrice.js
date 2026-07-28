// monedas
const CURRENCY_SYMBOLS = {
  USD: '$',
  CRC: '₡',
};

// formato
export function formatPrice(value, currency = 'USD') {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${value.toFixed(2)}`;
}
