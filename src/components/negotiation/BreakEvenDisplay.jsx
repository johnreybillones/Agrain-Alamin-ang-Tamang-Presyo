/**
 * Displays the computed break-even price and the profit/loss verdict.
 *
 * @param {number}  breakEvenPrice - Computed ₱/kg minimum
 * @param {boolean} isProfitable   - true = KITA, false = LUGI
 */
export default function BreakEvenDisplay({ breakEvenPrice, isProfitable }) {
  return (
    <div className="px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center gap-2">
        <p className="text-base text-gray-500 font-medium">Presyong Balik-Puhunan</p>
        <p className="text-4xl font-bold tabular-nums text-gray-900">
          ₱
          {breakEvenPrice > 0
            ? breakEvenPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : '—'}
          <span className="text-base font-normal text-gray-400">/kg</span>
        </p>

        {breakEvenPrice > 0 && (
          <div
            className={`mt-1 px-6 py-2 rounded-full text-2xl font-black tracking-widest ${
              isProfitable
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {isProfitable ? 'KITA! 🎉' : 'LUGI! ⚠️'}
          </div>
        )}
      </div>
    </div>
  );
}
