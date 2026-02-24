/**
 * Filling tank that visualizes total seasonal expenses.
 * Fills from bottom to top in red tones.
 *
 * @param {number} totalExpenses - Current total in ₱
 * @param {number} maxExpenses   - Visual "full" level (e.g. ₱35,000)
 */
export default function BucketVisual({ totalExpenses, maxExpenses = 35000 }) {
  const fillPct = Math.min((totalExpenses / maxExpenses) * 100, 100);

  return (
    <div className="flex flex-col items-center px-4 py-2">
      {/* Tank */}
      <div className="relative w-48 h-48 rounded-2xl border-4 border-red-300 bg-white overflow-hidden shadow-inner">
        {/* Fill */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-red-400 transition-all duration-700"
          style={{ height: `${fillPct}%` }}
        />
        {/* Amount overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums text-gray-900 drop-shadow">
            ₱{totalExpenses.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600 font-medium">Kabuuang Gastos</span>
        </div>
      </div>
      {/* Labels */}
      <div className="flex justify-between w-48 mt-1 text-xs text-gray-400">
        <span>₱0</span>
        <span>₱{maxExpenses.toLocaleString()}</span>
      </div>
    </div>
  );
}
