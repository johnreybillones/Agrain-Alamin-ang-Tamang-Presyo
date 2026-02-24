/**
 * Large number input for total harvest weight in kg.
 */
export default function HarvestInput({ value, onChange }) {
  return (
    <div className="px-4">
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Timbang ng Ani (kg)
      </label>
      <input
        type="number"
        inputMode="numeric"
        min="1"
        placeholder="hal. 500"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full min-h-14 px-4 py-3 text-3xl font-bold border-2 border-green-400 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-green-600 tabular-nums"
      />
    </div>
  );
}
