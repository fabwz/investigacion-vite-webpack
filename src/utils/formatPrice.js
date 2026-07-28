// utils/formatPrice.js
//
// Utilidad simple usada como ejemplo en vivo: si el profesor pide agregar
// otra moneda (por ejemplo EUR) o cambiar el formato, basta con tocar este
// archivo pequeño y aislado, sin tocar main.js ni los componentes.

// Simbolo de cada moneda soportada. Agregar una moneda nueva es tan
// simple como sumar una entrada aqui.
const CURRENCY_SYMBOLS = {
  USD: '$',
  CRC: '₡',
};

/**
 * Formatea un numero como precio, anteponiendo el simbolo de la moneda y
 * fijando siempre dos decimales (toFixed(2)).
 * @param {number} value - monto a formatear.
 * @param {string} [currency='USD'] - codigo de moneda soportado (USD, CRC).
 * @returns {string} precio formateado, ej. "$12.50" o "₡12.50".
 */
export function formatPrice(value, currency = 'USD') {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${value.toFixed(2)}`;
}
