import { useEffect, useState } from 'react';
import { TIERS } from '../../utils/constants.js';
import { formatRelative } from '../../utils/dateUtils.js';

/**
 * Single expense row showing tier badge, value, optional photo thumbnail, relative time, and delete button.
 */
export default function ExpenseCard({ expense, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const tier = TIERS[expense.tier] || {};

  useEffect(() => {
    if (expense.photoBlob) {
      const url = URL.createObjectURL(expense.photoBlob);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [expense.photoBlob]);

  function handleDeleteClick() {
    if (confirming) {
      onDelete(expense.id);
    } else {
      setConfirming(true);
      // Auto-cancel confirmation after 3 s
      setTimeout(() => setConfirming(false), 3000);
    }
  }

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
      {/* Tier badge */}
      <div
        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0 ${tier.color || 'bg-gray-400'}`}
      >
        <span className="text-2xl leading-none">{tier.icon}</span>
        <span className="text-xs font-bold mt-0.5">{tier.label?.[0]}</span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold text-gray-900">{tier.label || expense.tier}</p>
        <p className="text-sm text-gray-500">{formatRelative(expense.timestamp)}</p>
      </div>

      {/* Photo thumbnail */}
      {photoUrl && (
        <img
          src={photoUrl}
          alt="Larawan ng gastos"
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-200"
        />
      )}

      {/* Value */}
      <span className="text-xl font-bold text-gray-900 tabular-nums flex-shrink-0">
        ₱{expense.value.toLocaleString()}
      </span>

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            confirming
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
          }`}
          aria-label={confirming ? 'Kumpirmahin ang burahin' : 'Burahin ang gastos'}
          title={confirming ? 'I-tap ulit para kumpirmahin' : 'Burahin'}
        >
          {/* Trash can SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-5 h-5">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      )}
    </div>
  );
}
