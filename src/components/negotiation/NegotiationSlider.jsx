/**
 * High-contrast range slider for the buyer's offer price.
 * Fires checkOffer logic on every change event.
 *
 * @param {number}   value          - Current slider value (₱/kg)
 * @param {function} onChange        - Called with new number value
 * @param {number}   breakEvenPrice  - The profit threshold
 * @param {number}   max             - Max slider value (default: breakEven × 2 or 100)
 */
export default function NegotiationSlider({ value, onChange, breakEvenPrice, max }) {
  const sliderMax = max || Math.max(Math.ceil(breakEvenPrice * 2), 100);
  const isProfitable = value >= breakEvenPrice;

  // Percentage position of the break-even marker
  const markerPct = breakEvenPrice > 0 ? (breakEvenPrice / sliderMax) * 100 : 0;

  return (
    <div className="px-4 w-full">
      <label className="block text-lg font-semibold text-gray-700 mb-3">
        Alok ng Mamimili (₱/kg)
      </label>

      {/* Slider track wrapper */}
      <div className="relative">
        <input
          type="range"
          min={0}
          max={sliderMax}
          step={0.5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-5 appearance-none rounded-full cursor-pointer outline-none"
          style={{
            background: `linear-gradient(to right, ${
              isProfitable ? '#16a34a' : '#dc2626'
            } ${(value / sliderMax) * 100}%, #d1d5db ${(value / sliderMax) * 100}%)`,
          }}
        />

        {/* Break-even marker */}
        {breakEvenPrice > 0 && (
          <div
            className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
            style={{ left: `${markerPct}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-1 h-5 bg-yellow-400 rounded-full" />
          </div>
        )}
      </div>

      {/* Value display */}
      <div className="flex justify-between items-end mt-3">
        <span className="text-sm text-gray-400">₱0</span>
        <span
          className={`text-4xl font-bold tabular-nums transition-colors ${
            isProfitable ? 'text-green-700' : 'text-red-600'
          }`}
        >
          ₱{value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          <span className="text-base font-normal text-gray-500">/kg</span>
        </span>
        <span className="text-sm text-gray-400">₱{sliderMax}</span>
      </div>
    </div>
  );
}
