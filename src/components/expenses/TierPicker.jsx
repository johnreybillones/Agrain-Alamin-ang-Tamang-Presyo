import { TIERS } from '../../utils/constants.js';

/**
 * Three large S/M/L tier picker buttons.
 * @param {function} onSelect - Called with tier key ("Small" | "Medium" | "Large")
 */
export default function TierPicker({ onSelect }) {
  return (
    <div className="flex flex-col gap-4 px-4">
      {Object.values(TIERS).map(({ key, label, sublabel, value, color, icon }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`min-h-20 flex items-center justify-between px-6 py-4 rounded-2xl text-white active:scale-95 transition-transform shadow-md ${color}`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{icon}</span>
            <div className="text-left">
              <p className="text-xl font-bold">{label}</p>
              <p className="text-sm opacity-90">{sublabel}</p>
            </div>
          </div>
          <span className="text-2xl font-bold tabular-nums">
            ₱{value.toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}
