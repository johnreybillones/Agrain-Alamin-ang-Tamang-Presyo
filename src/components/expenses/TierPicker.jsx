import { COLORS, FONTS } from '../../utils/designTokens.js';

/**
 * AmountInput — Free-form peso amount number field for logging an expense.
 * Replaces the fixed S/M/L tier picker.
 * @param {string|number} value    - Current input value
 * @param {function}      onChange - Called with the numeric value (or '' when empty)
 */
export default function AmountInput({ value, onChange }) {
  function handleChange(e) {
    const raw = e.target.value;
    if (raw === '') { onChange(''); return; }
    const num = parseFloat(raw);
    if (!isNaN(num) && num <= 99999) onChange(num);
  }

  return (
    <input
      type="number"
      inputMode="numeric"
      min="1"
      max="99999"
      step="1"
      value={value}
      onChange={handleChange}
      placeholder="Halimbawa: 100"
      className="amount-input"
      aria-label="Halaga ng gastos"
    />
  );
}
