/**
 * Format a number as Philippine Peso using ₱ symbol.
 * Uses compact notation for large values to fit sunlight-readable displays.
 */
export function formatPeso(amount) {
  const n = Number(amount);
  if (isNaN(n)) return '₱0';
  return '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/**
 * Format using Intl.NumberFormat with full currency style.
 */
const phpFormatter = new Intl.NumberFormat('fil-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
  return phpFormatter.format(amount);
}
