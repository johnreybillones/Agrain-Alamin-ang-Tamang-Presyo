import { useEffect } from 'react';

/**
 * Full-screen green flash for ~800ms to confirm a successful local save.
 * The farmer does not need to read any text — the flash alone signals success.
 */
export default function ConfirmAnimation({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-600 animate-ping-once pointer-events-none">
      <div className="w-40 h-40 rounded-full bg-white/30 animate-scale-up" />
    </div>
  );
}
