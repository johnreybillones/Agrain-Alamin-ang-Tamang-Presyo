/**
 * BigButton — reusable large touch-target button (min 56px).
 */
export default function BigButton({ onClick, children, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-h-14 px-6 py-4 text-lg font-bold rounded-xl active:scale-95 transition-transform disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
